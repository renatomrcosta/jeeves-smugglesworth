module.exports = {
    globals: {
        "ts-jest": {
            tsConfigFile: "tsconfig.json",
        },
    },
    moduleFileExtensions: [
        "ts",
        "json",
        "js",
    ],
    testEnvironment: "node",
    testMatch: [
        "**/test/**/*.(test|spec).(ts|js)",
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "./node_modules/ts-jest/preprocessor.js",
    },
};
