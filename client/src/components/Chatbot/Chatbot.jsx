import React, { useState, useEffect } from 'react';

function Chatbot() {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [context, setContext] = useState('start');
  const [isActive, setIsActive] = useState(true);  // Nuevo estado para manejar la actividad del chat

  useEffect(() => {
    const welcomeMessage = {
      user: false,
      text: "Bienvenido al ChatBot. Ingresa 1 para Duda. Ingresa 2 para Problema."
    };
    setChatHistory([welcomeMessage]);
    setContext('main');
  }, []);

  const handleUserInput = (event) => {
    event.preventDefault();
    if (!isActive) return;  // No hacer nada si el chat no está activo

    const userInput = input.trim().toLowerCase();
    const newEntry = { user: true, text: input };
    setChatHistory(chatHistory => [...chatHistory, newEntry]);

    processInput(userInput);
    setInput('');
  };

  const processInput = (input) => {
    let responseText = "Lo siento, esa no es una opcion valida, vuelve a ingresar";
    if (!isActive) {
        responseText = "El chat ha terminado.";
      } 
      else if (context === 'main') {
        switch (input) {
            case '1':
                responseText = "¿En referencia a que tienes duda? (Ingresa 1 para torre, 2 para botellas, 3 para aplicacion o 4 para otro).";
                setContext('duda');
                break;
            case '2':
                responseText = "¿En referencia a que es tu problema? (Ingresa 1 para funcionamiento, 2 para salidas, 3 para aplicacion o 4 para otro).";
                setContext('problema');
                break;
            default:
                break;
        }
    } 
    else if (context === 'duda') {
        switch (input) {
            case '1':
                responseText = "¿Sobre que tienes duda de la torre? (Ingresa 1 para funcionamiento, 2 para salidas, 3 para aplicacion o 4 para otro).";
                setContext('duda_torre');
                break;
            case '2':
                responseText = "¿Sobre que tienes duda de las botellas? (Ingresa 1 para tamaño, 2 para deposito o 3 para otro).";
                setContext('duda_botellas');
                break;
            case '3':
                responseText = "¿Sobre que tienes duda de la aplicacion? (Ingresa 1 para inicio, 2 para mapa, 3 para tiempo, 4 para chatbot, 5 para perfil de usuario o 6 para otro).";
                setContext('duda_aplicacion');
                break;
            case '4':
                responseText = "Ingresa tu duda.";
                () => duda(

                );
                setContext('end');
                break;
            default:
                break;
        }
    } 
    else if(context === 'duda_torre'){
        switch (input) {
            case '1':
                responseText = "La torre funciona a base de electricidad fotovoltaica proveniente de la luz solar, cargando de esta forma los celulares con electricidad 100% limpia. Envia algun mensaje para terminar el chat.";
                setContext('end');
                break;
            case '2':
                responseText = "La torre contiene cuatro salidas, despues de introducir una botella espera 5 segundos y selecciona un boton para agregar el tiempo a la salida seleccionada. Envia algun mensaje para terminar el chat.";
                setContext('end');
                break;
            case '3':
                responseText = "La torre se conecta por medio de la aplicacion a introducir un codigo, de esa forma sabemos quien es el que se conecta a que salida en cual torre. Envia algun mensaje para terminar el chat.";
                setContext('end');
                break;
            case '4':
                responseText = "Ingresa tu duda.";
                () => torre(

                );
                setContext('end');
                break;
            default:
                break;
        }
    }
    else if(context === 'duda_botellas'){
        switch (input) {
            case '1':
                responseText = "Las botellas varian en su tamaño dependiendo de su capacidad, el tamaño lo determinan sensores internos para lograr calcular el tiempo. Envia algun mensaje para terminar el chat.";
                setContext('end');
                break;
            case '2':
                responseText = "El deposito se encuentra en frente de los botones, se tienen que depositar las botellas con cuidado y hasta el final, para una lectura correcta. Envia algun mensaje para terminar el chat.";
                setContext('end');
                break;
            case '3':
                responseText = "Ingresa tu duda.";
                () => botellas(

                );
                setContext('end');
                break;
            default:
                break;
        }
    }
    else if(context === 'duda_aplicacion'){
        switch (input) {
            case '1':
                responseText = "La aplicacion cuenta con un inicio o home, el cual cuenta con noticias y actualizaciones sobre temas verdes. Envia algun mensaje para terminar el chat.";
                setContext('end');
                break;
            case '2':
                responseText = "La aplicacion cuenta con un mapa donde se muestran las torres de carga y sus salidas disponibes para utilizar su tiempo. Envia algun mensaje para terminar el chat.";
                setContext('end');
                break;
            case '3':
                responseText = "La aplicacion cuenta con un cronometro que muestra su tiempo almacenado. Envia algun mensaje para terminar el chat.";
                setContext('end');
                break;
            case '4':
                responseText = "La aplicacion cuenta con un chatbot, HOLA!!!, estoy aqui para ayudarte con tus dudas o problemas. Envia algun mensaje para terminar el chat.";
                setContext('end');
                break;
            case '5':
                responseText = "La aplicacion cuenta con una opcion para ver tu perfil de usuario y modificarlo. Envia algun mensaje para terminar el chat.";
                setContext('end');
                break;
            case '6':
                responseText = "Ingresa tu duda.";
                () => aplicacion(

                );
                setContext('end');
                break;
            default:
                break;
        }
    }
    else if(context === 'problema'){
        switch (input) {
            case '1':
                responseText = "Ingresa tu problema.    ";
                () => problema(
                    
                );
                setContext('end');
                break;
            case '2':
                responseText = "¿Sobre que tienes problema con las botellas? (Ingresa 1 para tamaño, 2 para deposito o 3 para otro).";
                () => problema(

                );
                setContext('end');
                break;
            case '3':
                responseText = "¿Sobre que tienes problema con la aplicacion? (Ingresa 1 para inicio, 2 para mapa, 3 para tiempo, 4 para chatbot, 5 para perfil de usuario o 6 para otro).";
                () => problema(

                );
                setContext('end');
                break;
            case '4':
                responseText = "Ingresa tu duda.";
                () => problema(

                );
                setContext('end');
                break;
            default:
                break;
        }
    }
    else if (context === 'end') {
        responseText = "El chat termino, muchas gracias por su tiempo.";
        setIsActive(false);
    }

    const botResponse = { user: false, text: responseText };
    setChatHistory(chatHistory => [...chatHistory, botResponse]);
};

return (
    <div className="mt-10 p-4 border-2 border-black rounded-lg shadow-lg" style={{ height: '85%', width: '85%' }}>
      <div className="overflow-auto h-64 mb-4" style={{ height: '70%', width: '95%' }}>
        {chatHistory.map((entry, index) => (
          <div key={index} className={`flex items-center my-2 ${entry.user ? "flex-row-reverse" : "flex-row"}`}>
            <i className={`bx ${entry.user ? "bx-user" : "bx-bot"} bx-sm text-xl`} />
            <div className={`p-2 rounded-lg text-white ${entry.user ? "bg-green-500" : "bg-blue-500"}`}>
              {entry.text}
            </div>
          </div>
        ))}
      </div>
      <div style={{ width: '100%' }}>
        <form onSubmit={handleUserInput} className="w-full">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="w-full p-2 border-2 border-gray-300 rounded"
            placeholder="Type your response here..."
            disabled={!isActive}
          />
          <button type="submit" className="w-full mt-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;