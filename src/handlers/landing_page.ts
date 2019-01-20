const path = require("path");
const log = require('debug')('app:log');

const landingPageHandler = (res) => {
    res.status(200).sendFile(path.join(__dirname, '..', '..', 'landing-page/index.html'))
};

module.exports = {
    handle: landingPageHandler
};
