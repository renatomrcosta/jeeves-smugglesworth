import express from "express";
import path from "path";

const landingPageHandler = (res: express.Response, app: express.Application) => {
    app.use(express.static(path.join(__dirname,'..', '..', 'node_modules', 'jeeves-landing-page', 'src/public')));
    res.status(200).sendFile(path.join(__dirname, '..', '..', 'node_modules', 'jeeves-landing-page', 'src', 'index.html'))
};

export default {
    handle: landingPageHandler
};
