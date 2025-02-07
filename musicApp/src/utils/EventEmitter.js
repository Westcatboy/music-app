export class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(eventName, fn) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(fn);
    }

    emits(eventName, ...args) {
        this.events[eventName].forEach(fn => {
            fn(...args);
        });
    }

    off(eventName, fn) {
        this.events[eventName] = this.events[eventName].filter(v => v !== fn);
    }
}