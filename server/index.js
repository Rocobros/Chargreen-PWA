const app = require('./app.js')
const setupWebSocket = require('./websocket.js');

const wsHelpers = setupWebSocket();

app.locals.sendDataToEsp = wsHelpers.sendToEsp;

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})