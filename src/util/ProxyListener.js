export default class ProxyListener {
    listeners = [];

    addListener(func) {
        this.listeners.push(func);
    }

    removeListener(func) {
        const funcIndex = this.listeners.indexOf(func);

        if (funcIndex > -1) {
            this.listeners.splice(funcIndex, 1);
        }
    }

    emit(...args) {
        return this.listeners.every((listener) => listener(...args));
    }
}
