const KEEP_ALIVE_MESSAGE = "Hello There";

const keepAliveHandler = () => {
    return KEEP_ALIVE_MESSAGE;
};

export default {
    handle: keepAliveHandler,
};
