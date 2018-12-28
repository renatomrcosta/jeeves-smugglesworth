const https = require('https');

const url = process.env.ENVIRONMENT_URL;

const KEEP_ALIVE_TIMER = 600000;

const keepHerokuAlive = () => {
    if(url){
        setInterval(() => {
            https.get(url,(response) => {
                console.log(`Keep Alive on ${url} triggered at`, new Date(), "Status code: " ,response.statusCode);
            });
        }, KEEP_ALIVE_TIMER);
    }
};

module.exports = keepHerokuAlive;