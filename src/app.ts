import {World} from "./World"
import {Vector2d} from "./model/Vector2d"
import {Circle} from "./model/Circle"

let lastDate: Date;

function RefreshFactory(elem: HTMLCanvasElement, world: World): Function {
    return function() {
        const width = elem.width;
        const height = elem.height;
        const ctx = elem.getContext("2d");
        ctx.clearRect(0, 0, width, height);
        let now = new Date();
        let deltaTime = (now.getTime() - lastDate.getTime()) / 1000;
        world.update(deltaTime);
        world.paint(ctx, width, height);
        lastDate = now;
    }
}

document.addEventListener("DOMContentLoaded", function(event) { 
    let my_canvas = <HTMLCanvasElement>document.getElementById("my-canvas");

    my_canvas.width = window.innerWidth;
    my_canvas.height = window.innerHeight;
    window.addEventListener("resize", (evt) => {
        my_canvas.width = window.innerWidth;
        my_canvas.height = window.innerHeight;
    });

    let world = new World();
    lastDate = new Date();

    setInterval(RefreshFactory(my_canvas, world), 40);
});
