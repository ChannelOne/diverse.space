
export class VirtualScroller {

    private _container: HTMLDivElement;
    private _scroll_tain: HTMLDivElement;
    private _content: HTMLDivElement;

    private _scroll_event_handlers: Function[];

    private _last_top: number;

    constructor(con: HTMLDivElement) {
        this._scroll_event_handlers = [];
        this._container = con;

        this._scroll_tain = <HTMLDivElement>document.querySelector(".scroll-train");
        this._content = <HTMLDivElement>document.querySelector(".scroll-container");
        this._container.appendChild(this._scroll_tain);

        this._scroll_tain.style.height =  1e6 + "px";

        this._last_top = this._container.scrollTop = 1e6 / 2;

        window.addEventListener("resize", (e) => {
            this._content.style.width = window.innerWidth + "px";
            this._content.style.height = window.innerHeight + "px";
        })
        this._content.style.width = window.innerWidth + "px";
        this._content.style.height = window.innerHeight + "px";

        setTimeout(() => {
            this._container.addEventListener("scroll", e => this.handleScroll(e));
        }, 100);

        this.handleScroll(null);
    }

    onScroll(callback: Function) {
        this._scroll_event_handlers.push(callback);
    }

    handleScroll(e: Event) {
        // this._content.style.marginTop = this._container.scrollTop + "px";
        let delta = this._container.scrollTop - this._last_top;
        this._content.style.transform = "translateY(" + this._container.scrollTop + "px" + ")";
        this._scroll_event_handlers.forEach(v => v.call(undefined, delta))
        this._last_top = this._container.scrollTop;
    }

    get container() {
        return this._container;
    }

}
