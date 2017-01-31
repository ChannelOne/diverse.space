import * as THREE from "three"
import {MyScene} from "./myScene"

var container = document.getElementById("my-canvas");
var audioElem: HTMLAudioElement;

function init() {
    new MyScene().appendTo(container);

    audioElem = <HTMLAudioElement>document.createElement("audio");

    var source = <HTMLSourceElement>document.createElement("source");
    source.type = "audio/mpeg";
    source.src = "/assets/audios/bgm.mp3";
    audioElem.appendChild(source);
    document.body.appendChild(audioElem);

    audioElem.play();
}

window.addEventListener("resize", (e: Event) => {

    document.body.removeChild(audioElem);
    audioElem = null;

    while(container.lastChild) {
        container.removeChild(container.lastChild);
    }

    init();

})

init();
