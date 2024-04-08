const WebSocket = require('ws');

function setupWebSocket() {
  const wss = new WebSocket.Server({port: 8000}, () => {
    console.log('WS Server is listening at ' + 8000)
  });

  let espClient = null;

  wss.on('connection', (ws) => {
    console.log('Cliente conectado');
    espClient = ws;

    ws.on('message', (message) => {
      console.log('Received: %s', message);

        try {
            // Deserialize the JSON string to a JavaScript object
            const data = JSON.parse(message);
            

            // Get the ID
            const messageText = data.id;

            console.log(data);
        } catch (error) {
            console.error('Error parsing JSON: ', error);
        }

    });

    ws.on('close', () => {
      if (ws === espClient) {
        espClient = null;
        console.log('Cliente ESP desconectado');
      }
    });
  });

  return {
    sendToEsp: (data) => {
      return new Promise((resolve, reject) => {
        if (espClient) {
          espClient.send(data);
          resolve();
        } else {
          reject(new Error('ESP no está conectado.'));
        }
      });
    },
  };
}

module.exports = setupWebSocket;