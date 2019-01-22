import keepAliveHandler from "../../src/handlers/keep_alive";

const KEEP_ALIVE_MESSAGE = "Hello There";

test("Keep Alive Test", () => {
    expect(keepAliveHandler.handle()).toBe(KEEP_ALIVE_MESSAGE);
});
