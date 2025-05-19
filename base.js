//- KONFIG -
const kepMappa  = "képek/";
const hatterzeneMappa  = "háttérzenék/";
const hatterzeneKezeloAlpha = 0.2;
const hangeffektekMappa  = "hangeffektek/";

//- SETUP -
const tarto = document.createElement("div");
tarto.id = "tarto";

const hatterzeneKezelo = document.createElement("audio");
hatterzeneKezelo.style.opacity = hatterzeneKezeloAlpha;
hatterzeneKezelo.setAttribute("controls", "controls");
hatterzeneKezelo.setAttribute("autoplay", "autoplay");
hatterzeneKezelo.setAttribute("loop", "loop");

document.body.appendChild(tarto);
document.body.appendChild(hatterzeneKezelo);

//- VÁLTOZÓK -
export var oldalak = [];
var oldalMentes;
var hatterzeneMentes;

//- FUNKCIÓK - 
//Fejléc
export function Fejlec(szoveg, szin = "white") {
    this.szoveg = szoveg;
    this.szin = szin;
}

//Leírás
export function Leiras(szoveg, szin = "white") {
    this.szoveg = szoveg;
    this.szin = szin;
}

//Gomb
export function GombSzin(hatterSzin, szovegSzin) {
    this.hatterSzin = hatterSzin;
    this.szovegSzin = szovegSzin;
}

export function Gomb(szoveg, oldal, gombSzin = new GombSzin("blue", "white")) {
    this.szoveg = szoveg;
    this.oldal = oldal;
    this.gombSzin = gombSzin;
}

//Háttérzene
export function Hatterzene(cim, kezdes = "00:00") {
    this.cim = cim;
    this.kezdes = kezdes;
}

//Hangeffekt
export function Hangeffekt(cim, kezdes = "00:00") {
    this.cim = cim;
    this.kezdes = kezdes;
}

//Oldal
export function Oldal(cim, hatter, fejlec, leiras, gombok, hatterzene, hangeffektek = null) {
    this.cim = cim;
    this.hatter = hatter;
    this.fejlec = fejlec;
    this.leiras = leiras;
    this.gombok = gombok;
    this.hatterzene = hatterzene;
    this.hangeffektek = hangeffektek;

    var kimenet = `
        <div class="fejlec" style="color: ${fejlec.szin};">
            <h1>${fejlec.szoveg}</h1>
        </div>
        <div class="leiras" style="color: ${leiras.szin};">
            <h2>${leiras.szoveg}</h2>
        </div>

        <div class="gombok">
    `;

    //Gombok generálása
    for (let i = 0; i < gombok.length; i++) {
        var gomb = gombok[i];
        kimenet += `
            <a onclick="OldalBetoltes('${gomb.oldal}');" class="gomb" style="background-color: ${gomb.gombSzin.hatterSzin}; color: ${gomb.gombSzin.szovegSzin};">${gomb.szoveg}</a>
        `;
    }
    kimenet += `</div><p class="alsoMargin"></p>`;
    this.kimenet = kimenet;
    this.hatter = `url(${kepMappa}${hatter})`;

    oldalak.push(this);
}

export function OldalKereses(oldalBe) {
    if (typeof oldalBe !== "string") {
        oldalBe = oldalBe.cim;
    }
    var oldal = oldalak.find(oldal => oldal.cim == oldalBe);
    return oldal;
}

//- OLDALAK -
let kezdo = new Oldal(
    "kezdo",
    "1.png",
    new Fejlec("Kezd el a kalandozást!", "yellow"),
    new Leiras("Kezd el a kalandot a bal gombra kattintva!", "pink"),
    [ 
        new Gomb("Tovább a második oldalra", "masodik", new GombSzin("green", "white")),
        new Gomb("Ez amúgy nem csinál semmit", "", new GombSzin("red", "black")),
    ],
    new Hatterzene("Jamiroquai_FeelsJustLikeItShould.mp3", "00:15"),
    []
);

oldalMentes = kezdo;
hatterzeneMentes = new Hatterzene("KEZDÉS", "00:00");

//- OLDAL BETÖLTÉSE -
export function OldalBetoltes(oldalBe) {
    if (oldalBe == "" || oldalBe == null) {
        return;
    }

    var oldal = OldalKereses(oldalBe);

    var szoveg = oldal.kimenet;
    var hatter = oldal.hatter;
    var hatterzene = oldal.hatterzene;
    var hangeffektek = oldal.hangeffektek;

    if (hatterzene.cim != "Folytat" && hatterzene.cim != hatterzeneMentes.cim) {
        if (hatterzene.cim == null) {
            hatterzeneKezelo.src = "";
        } else {
            hatterzeneKezelo.src = hatterzeneMappa + hatterzene.cim + "#t=" + hatterzene.kezdes;
        }
    }

    if (hatterzene.cim != "Folytat") {
        hatterzeneMentes = hatterzene;
    }
    
    hatterzeneKezelo.play();

    if (tarto.innerHTML != szoveg || tarto.style.backgroundImage != hatter) {
        oldalMentes = oldal;
        tarto.innerHTML = szoveg;
        tarto.style.backgroundImage = hatter;

        for (let i = 0; i < hangeffektek.length; i++) {
            var hangeffekt = hangeffektek[i];
            var audio = document.createElement("audio");
            audio.src = hangeffektekMappa + hangeffekt.cim + "#t=" + hangeffekt.kezdes;
            audio.setAttribute("autoplay", "autoplay");
            audio.play();
        }
    }
}

window.OldalBetoltes = OldalBetoltes;

//- FUTÁS -
OldalBetoltes(kezdo);