const express = require("express");
const path = require("path");
const log = require('debug')('app:log');

const landingPageHandler = (res, app) => {
    app.use(express.static(path.join(__dirname,'..', '..', 'node_modules', 'jeeves-landing-page', 'src/public')));
    res.status(200).sendFile(path.join(__dirname, '..', '..', 'node_modules', 'jeeves-landing-page', 'src', 'index.html'))
};

module.exports = {
    handle: landingPageHandler
};
