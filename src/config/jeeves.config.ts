const config = () => {
    //Loads the .env file for local execution of Jeeves.
    if(process.env.NODE_ENV !== 'production'){
        require('dotenv').config();
    }

    //Configures Firebase for storing the queue
    if(process.env.FIREBASE){
        require('firebase.config.ts')();
    }
};


module.exports = config;