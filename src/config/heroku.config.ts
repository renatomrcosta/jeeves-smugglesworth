import https from "https";

const URL = process.env.HEROKU_KEEP_ALIVE_URL + "keep-alive";
const KEEP_ALIVE_TIMER = 600000;

const keepHerokuAlive = () => {
    if (URL) {
        setInterval(() => {
            https.get(URL, (response) => {
                console.log(`Keep Alive on ${URL} triggered at`, new Date(), "Status code: " , response.statusCode);
            });
        }, KEEP_ALIVE_TIMER);
    }
};

module.exports = {
    config: keepHerokuAlive,
};
