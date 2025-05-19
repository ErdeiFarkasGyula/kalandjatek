import {
    Fejlec,
    Leiras,
    GombSzin,
    Gomb,
    Hatterzene,
    Hangeffekt,
    Oldal,
} from "../base.js";

new Oldal(
    "masodik",
    "2.webp",
    new Fejlec("Üdvözöljük! Ez a második oldal!"),
    new Leiras("Itt található a második oldal, ahol további információkat találhat."),
    [
        new Gomb("Vissza az első oldalra", "kezdo", new GombSzin("red", "rgb(77, 0, 150)")),
        new Gomb("Tovább a harmadik oldalra", "harmadik", new GombSzin("green", "black")),
        new Gomb("Ez a gomb sem csinál semmit", ""),
    ],
    new Hatterzene("Folytat"),  
    [
        new Hangeffekt("bark.wav"),
    ]
);

new Oldal(
    "harmadik",
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