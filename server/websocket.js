const WebSocket = require('ws')
const crearRegistro = require('./utils/crearRegistro')
const ReactivateExit = require('./utils/ReactivateExit')
const getExitCode = require('./utils/getExitCode')
const sendMailToAdmins = require('./utils/sendMailToAdmins')

function setupWebSocket() {
  const wss = new WebSocket.Server({ port: 8000 }, () => {
    console.log('WS Server is listening at ' + 8000)
  })

  let espClient = null

  wss.on('connection', (ws) => {
    console.log('Cliente conectado')
    espClient = ws

    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message)
        console.log(data)
        if (data.salida === '0') {
          sendMailToAdmins(data)
          console.log('Mail send to Admins')
        } else if (data.botella !== '0') {
          await crearRegistro(data).then(async (res) => {
            console.log('Registro creado')
            const code = await getExitCode(data)
            ws.send(
              JSON.stringify({
                Torre: data.id,
                Salida: data.salida,
                Tiempo: -1,
                Codigo: code,
              })
            )
          })
        } else {
          ReactivateExit(data)
        }
      } catch (error) {
        console.error('Error parsing JSON: ', error)
      }
    })

    ws.on('close', () => {
      if (ws === espClient) {
        espClient = null
        console.log('Cliente ESP desconectado')
      }
    })
  })

  return {
    sendToEsp: (data) => {
      return new Promise((resolve, reject) => {
        if (espClient) {
          espClient.send(data)
          resolve()
        } else {
          reject(new Error('La torre se encuentra desconectada'))
        }
      })
    },
  }
}

module.exports = setupWebSocket
