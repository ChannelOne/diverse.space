import * as THREE from "three"
import {MyScene} from "./myScene"

var container = document.getElementById("my-canvas");
var audioElem: HTMLAudioElement;

var myscene: MyScene;

function init() {
    myscene = new MyScene();
    myscene.appendTo(container);

    audioElem = <HTMLAudioElement>document.createElement("audio");

    var source = <HTMLSourceElement>document.createElement("source");
    source.type = "audio/mpeg";
    source.src = "/assets/audios/bgm.mp3";
    audioElem.appendChild(source);
    document.body.appendChild(audioElem);

    audioElem.play();
}

function replay() {

    document.body.removeChild(audioElem);
    audioElem = null;

    while(container.lastChild) {
        container.removeChild(container.lastChild);
    }

    init();

}

window.addEventListener("resize", (e: Event) => {
    myscene.camera.aspect = window.innerWidth / window.innerHeight;
    myscene.camera.updateProjectionMatrix();

    myscene.renderer.setSize(window.innerWidth, window.innerHeight);
    myscene.render();
})

init();
