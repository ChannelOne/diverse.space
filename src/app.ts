import * as THREE from "three"
import {MyScene} from "./myScene"

var container = document.getElementById("my-canvas");

function init() {
    new MyScene().appendTo(container);
}

window.addEventListener("resize", (e: Event) => {

    while(container.lastChild) {
        container.removeChild(container.lastChild);
    }

    init();

})

init();
