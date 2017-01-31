import * as THREE from "three"
import {MyScene} from "./myScene"

var container = document.getElementById("my-canvas");
var audioElem: HTMLAudioElement;

function init() {
    new MyScene().appendTo(container);

    audioElem = <HTMLAudioElement>document.createElement("audio");
    audioElem.autoplay = true;

    var source = <HTMLSourceElement>document.createElement("source");
    source.type = "audio/ogg";
    source.src = "/assets/audios/bgm.ogg";
    audioElem.appendChild(source);
    document.body.appendChild(audioElem);
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
