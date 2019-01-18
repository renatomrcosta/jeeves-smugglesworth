const path = require("path");
const log = require('debug')('app:log');

const landingPageHandler = (res) => {
    log(path.join(__dirname, '..', 'landing-page/index.html'));
    res.status(200).sendFile(path.join(__dirname, '..', 'landing-page/index.html'))
};

module.exports = {
    handle: landingPageHandler
};
