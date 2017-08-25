define([
    "dojo/dom-construct",
    "dojo/dom-style",
], function (domConstruct, domStyle) {
    'use strict';
    return class Tooltip {
        constructor() {
            this.container = domConstruct.toDom('<div class="dtg-tooltip-map"></div>');
            domStyle.set(this.container, {
                position: 'fixed'
            });
            
        }
        static instance() {
            if (!this._instance)
                this._instance = new Tooltip();
            return this._instance;
        }
        show(screencoor, string) {
            document.body.appendChild(this.container);
            domStyle.set(this.container, {
                left: `${screencoor[0]+30}px`,
                top: `${screencoor[1]}px`
            })
            this.container.innerHTML = string;
        }
        hide() {
            document.body.removeChild(this.container);
        }
    }
});