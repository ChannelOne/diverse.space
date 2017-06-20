import {World} from "./World"
import {Vector2d} from "./model/Vector2d"
import {Circle} from "./model/Circle"
import {VirtualScroller} from "./view"

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
    const show_case = <HTMLDivElement>document.getElementById("showcase");
    const virtual_scroller_elem = <HTMLDivElement>document.getElementById("virtual-scroller");
    const my_canvas = <HTMLCanvasElement>document.getElementById("my-canvas");

    let virtual_scroller = new VirtualScroller(virtual_scroller_elem);

    my_canvas.width = window.innerWidth;
    my_canvas.height = window.innerHeight;
    window.addEventListener("resize", (evt) => {
        my_canvas.width = window.innerWidth;
        my_canvas.height = window.innerHeight;
    });

    let world = new World();
    lastDate = new Date();

    let mousedown = false;
    let originPoint: Vector2d;

    virtual_scroller.onScroll((delta: number) => {
        if (world.camera.scale > 0.1 || delta > 0) {
            world.camera.scale += delta * 0.001;
        }
    });

    my_canvas.addEventListener("mousedown", (e) => {
        mousedown = true;
        originPoint = new Vector2d(e.clientX, e.clientY);
        show_case.style.display = "none";
    })

    my_canvas.addEventListener("mousemove", (e => {
        if (!mousedown) return;
        const scale = my_canvas.width / 42 * world.camera.scale;

        let newPoint = new Vector2d(e.clientX, e.clientY);
        let deltaPoint = newPoint.sub(originPoint).divide(scale);
        world.camera.position = world.camera.position.sub(deltaPoint);
        originPoint = newPoint;
    }))

    my_canvas.addEventListener("mouseup", (e) => {
        mousedown = false;
        show_case.style.display = "block";
    })

    setInterval(RefreshFactory(my_canvas, world), 40);
});
