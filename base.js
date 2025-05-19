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
var oldalMentes;
var hatterzeneMentes;

//- FUNKCIÓK - 
//Fejléc
function Fejlec(szoveg, szin = "white") {
    this.szoveg = szoveg;
    this.szin = szin;
}

//Leírás
function Leiras(szoveg, szin = "white") {
    this.szoveg = szoveg;
    this.szin = szin;
}

//Gomb
function GombSzin(hatterSzin, szovegSzin) {
    this.hatterSzin = hatterSzin;
    this.szovegSzin = szovegSzin;
}

function Gomb(szoveg, oldal, gombSzin = new GombSzin("blue", "white")) {
    this.szoveg = szoveg;
    this.oldal = oldal;
    this.gombSzin = gombSzin;
}

//Háttérzene
function Hatterzene(cim, kezdes = "00:00") {
    this.cim = cim;
    this.kezdes = kezdes;
}

//Hangeffekt
function Hangeffekt(cim, kezdes = "00:00") {
    this.cim = cim;
    this.kezdes = kezdes;
}

//Oldal
function Oldal(hatter, fejlec, leiras, gombok, hatterzene, hangeffektek = null) {
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
            <a onclick="OldalBetoltes(${gomb.oldal});" class="gomb" style="background-color: ${gomb.gombSzin.hatterSzin}; color: ${gomb.gombSzin.szovegSzin};">${gomb.szoveg}</a>
        `;
    }
    kimenet += `</div><p class="alsoMargin"></p>`;

    var hatter = `url(${kepMappa}${hatter})`;
    tarto.style.backgroundImage = hatter;

    return [kimenet, hatter, hatterzene, hangeffektek];
}


//- OLDALAK -
let kezdo = new Oldal(
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

let masodik = new Oldal(
    "2.webp",
    new Fejlec("Üdvözöljük! Ez a második oldal!"),
    new Leiras("Itt található a második oldal, ahol további információkat találhat."),
    [
        new Gomb("Vissza az első oldalra", "kezdo"),
        new Gomb("Tovább a harmadik oldalra", "harmadik"),
    ],
    new Hatterzene("Folytat"),
    [
        new Hangeffekt("bark.wav"),
    ]
);

let harmadik = new Oldal(
    "3.png",
    new Fejlec("Üdvözöljük! Ez a harmadik oldal!"),
    new Leiras("Itt található a harmadik oldal, de innen már nincs tovább!"),
    [
        new Gomb("Vissza az első oldalra", "kezdo"),
        new Gomb("Vissza a második oldalra", "masodik"),
    ],
    new Hatterzene(null),
    [
        new Hangeffekt("over.wav"),
        new Hangeffekt("whistle.wav"),
    ]
);

oldalMentes = kezdo;
hatterzeneMentes = new Hatterzene("KEZDÉS", "00:00");

//- OLDAL BETÖLTÉSE -
function OldalBetoltes(oldal) {
    var szoveg = oldal[0];
    var hatter = oldal[1];
    var hatterzene = oldal[2];
    var hangeffektek = oldal[3];

    console.log("Háttérzene:", hatterzene, "Mentés:", hatterzeneMentes);
    if (hatterzene.cim != "Folytat" && hatterzene.cim != hatterzeneMentes.cim) {
        if (hatterzene.cim == null) {
            hatterzeneKezelo.src = "";
        } else {
            hatterzeneKezelo.src = hatterzeneMappa + hatterzene.cim + "#t=" + hatterzene.kezdes;
        }
    }
    if (hatterzeneMentes.cim == "")

    hatterzeneKezelo.play();
    if (hatterzene.cim != "Folytat") {
        hatterzeneMentes = hatterzene;
    }

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


//- FUTÁS -
OldalBetoltes(kezdo)