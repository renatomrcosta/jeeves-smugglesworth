const http = require('http');

const port = process.env.PORT || 4521;
const host = process.env.HOST || '0.0.0.0';

const KEEP_ALIVE_TIMER = 600000;

const keepHerokuAlive = () => {
    setInterval(() => {
        http.get(`${host}:${port}`).then((response)=> console.log("Keep Alive triggered at", new Date(), response));
    }, KEEP_ALIVE_TIMER);
};

module.exports = keepHerokuAlive;