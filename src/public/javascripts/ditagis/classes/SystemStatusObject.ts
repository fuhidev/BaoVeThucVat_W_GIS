import EventListener = require('./EventListener');
class SystemStatusObject {
    eventListener: EventListener;
    constructor() {
        this.eventListener = new EventListener(this);
    }
}
export = SystemStatusObject;