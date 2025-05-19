const tarto = document.getElementById("tarto");

function oldalBetoltes(oldal) {
    tarto.innerHTML = oldal[0];
    tarto.style.backgroundImage = oldal[1]
}

function gomb(szoveg, link) {
    this.szoveg = szoveg;
    this.link = link;
}

function oldal(hatter, fejlec, leiras, gomb1, gomb2) {
    this.hatter = hatter;
    this.fejlec = fejlec;
    this.leiras = leiras;
    this.gomb1 = gomb1;
    this.gomb2 = gomb2;

    var szoveg = `
        <div class="fejlec">
            <h1>${fejlec}</h1>
        </div>
        <div class="leiras">
            <p>${leiras}</p>
        </div>
        <div class="gombok">
            <a onclick="oldalBetoltes(${gomb1.link});" class="gomb">${gomb1.szoveg}</a>
            <a onclick="oldalBetoltes(${gomb2.link});" class="gomb">${gomb2.szoveg}</a>
        </div>
    `;

    var hatter = `url(images/${hatter})`;
    tarto.style.backgroundImage = hatter;

    return [szoveg, hatter];
}

let kezdo = oldal(
    "1.png",
    "Üdvözöljük az első oldalon!",
    "Itt található a tárgyaló szobája, ahol különböző feladatokat végezhet el.",
    new gomb("Ez nem csinál semmit", "kezdo"),
    new gomb("Tovább a második oldalra", "masodik"),
);

let masodik = oldal(
    "2.webp",
    "Üdvözöljük! Ez a második oldal!",
    "Itt található a második oldal, ahol további információkat találhat.",
    new gomb("Vissza az első oldalra", "kezdo"),
    new gomb("Tovább a harmadik oldalra", "harmadik"),
);

let harmadik = oldal(
    "3.png",
    "Üdvözöljük! Ez a harmadik oldal!",
    "Itt található a harmadik oldal, de innen már nincs tovább!",
    new gomb("Vissza az első oldalra", "kezdo"),
    new gomb("Vissza a második oldalra", "masodik"),
);

oldalBetoltes(kezdo)