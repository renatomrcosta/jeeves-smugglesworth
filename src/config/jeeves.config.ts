const config = () => {
    //Loads the .env file for local execution of Jeeves.
    if(process.env.NODE_ENV !== 'production'){
        require('dotenv').config();
    }

    //Configures Firebase for storing the queue
    if(process.env.FIREBASE){
        require('./firebase.config.ts')();
    }

    //If deployed in heroku, and configured to, trigger a keep alive.
    if(process.env.HEROKU_KEEP_ALIVE){
        require('./heroku.config.ts')();
    }
};


module.exports = config;