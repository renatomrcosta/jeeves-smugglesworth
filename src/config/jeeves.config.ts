// The configuration files use require to load the ENV properly
const config = () => {
    // Loads the .env file for local execution of Jeeves.
    if (process.env.NODE_ENV !== "production") {
        require("dotenv").config();
    }

    // Configures Firebase for storing the queue
    if (process.env.FIREBASE) {
        require("./firebase.config").config();
    }

    // If deployed in heroku, and configured to, trigger a keep alive.
    if (process.env.HEROKU_KEEP_ALIVE_URL) {
        require("./heroku.config").config();
    }
};

export default {
    config,
};
