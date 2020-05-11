import ProxyListener from "../ProxyListener";

describe("ProxyListener", () => {
    it("calls subscribed functions when events are emitted", () => {
        const pl = new ProxyListener();

        const listener1 = jest.fn().mockReturnValue(true);
        const listener2 = jest.fn().mockReturnValue(true);
        pl.addListener(listener1);
        pl.addListener(listener2);

        pl.emit("hello", "there");

        expect(listener1).toBeCalledWith("hello", "there");
        expect(listener2).toBeCalledWith("hello", "there");
    });

    it("does not call subscribed functions once removed", () => {
        const pl = new ProxyListener();

        const listener = jest.fn().mockReturnValue(true);
        pl.addListener(listener);

        pl.emit("whats", "up");

        expect(listener).toBeCalledWith("whats", "up");

        pl.removeListener(listener);

        pl.emit("snow", "flake");

        expect(listener).toBeCalledTimes(1);
        expect(listener).not.toBeCalledWith("snow", "flake");
    });
});
