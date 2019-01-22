import express from "express";

const keepAliveHandler = (res: express.Response) => {
    return res.status(200).send("Hello there!");
};

export default {
    handle: keepAliveHandler
};
