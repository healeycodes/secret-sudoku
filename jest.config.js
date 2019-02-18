module.exports = {
    testEnvironmentOptions: {
        beforeParse(window) {
            // The game uses `alert` to announce a complete board
            window.alert = (msg) => { };
        }
    },
}