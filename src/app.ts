import {Vector2d, Circle} from "./model"

function RefreshFactory(elem: HTMLCanvasElement): Function {
    return function() {
        const width = elem.width;
        const height = elem.height;
        const ctx = elem.getContext("2d");
        ctx.clearRect(0, 0, width, height);

    }
}

document.addEventListener("DOMContentLoaded", function(event) { 
    let my_canvas = <HTMLCanvasElement>document.getElementById("my-canvas");

    window.addEventListener("resize", (evt) => {
        my_canvas.width = window.innerWidth;
        my_canvas.height = window.innerHeight;
    });

    setInterval(RefreshFactory(my_canvas), 20);
});
