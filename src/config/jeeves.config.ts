const config = () => {
    //Loads the .env file for local execution of Jeeves.
    if(process.env.NODE_ENV !== 'production'){
        require('dotenv').config();
    }

};


module.exports = config;