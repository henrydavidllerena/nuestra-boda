import {home} from "./js/home.js";
import {bride} from "./js/bride.js";
import {time} from "./js/time.js";
import {galeri} from "./js/galeri.js";
import {wishas} from "./js/wishas.js";
import {navbar} from "./js/navbar.js";
import {welcome} from "./js/welcome.js";

document.addEventListener('DOMContentLoaded', () => {
    AOS.init();

    welcome();
    navbar();
    home();
    bride();
    time();
    galeri();
    wishas();

    // Colocar la Galería al final de la página
    const galeria = document.querySelector('#galeri');
    const audio = document.querySelector('section.audio');

    if (galeria && audio) {
        audio.parentNode.insertBefore(galeria, audio);
    }

    AOS.refresh();
});