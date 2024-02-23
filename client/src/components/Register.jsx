import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

import RegisterValidation from '../func/RegisterValdidation.js'

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    apep: "",
    apem: "",
    tel: "",
    email: "",
    user: "",
    pass: "",
    conf: ""
  });

  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(RegisterValidation(values));
    console.log(error)
    if(error){
      let reqValues = {}

      axios.get("http://localhost:8081/fk")
      .then((res) => {
        reqValues = {...values, ['fk']: [res.data.id + 1]}
      })

      axios.post("http://localhost:8081/register", reqValues)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }
  };

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: [event.target.value] });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-background">

      <div className="w-80 h-5/6 lg:w-96 lg:h-auto bg-primary text-text font-secondary font-semibold px-10 py-8 rounded-xl shadow-custom">

        <form onSubmit={handleSubmit}>
          <h1 className="font-primary font-bold text-4xl text-center">
            Registro
          </h1>

          <div className="w-full h-8 lg:h-12 my-7 relative">
            <input
              className="w-full h-full bg-transparent outline-none border-2 border-solid border-text rounded-3xl text-lg text-text placeholder:text-text py-5 pr-10 pl-5"
              type="text"
              name="name"
              placeholder="Nombre"
              onChange={handleInput}
            />
          </div>

          <div className="w-full h-8 lg:h-12 my-7 relative">
            <input
              className="w-full h-full bg-transparent outline-none border-2 border-solid border-text rounded-3xl text-lg text-text placeholder:text-text py-5 pr-10 pl-5"
              type="text"
              name="apep"
              placeholder="Apellido Paterno"
              onChange={handleInput}
            />
          </div>

          <div className="w-full h-8 lg:h-12 my-7 relative">
            <input
              className="w-full h-full bg-transparent outline-none border-2 border-solid border-text rounded-3xl text-lg text-text placeholder:text-text py-5 pr-10 pl-5"
              type="text"
              name="apem"
              placeholder="Apellido Materno"
              onChange={handleInput}
            />
          </div>

          <div className="w-full h-8 lg:h-12 my-7 relative">
            <input
              className="w-full h-full bg-transparent outline-none border-2 border-solid border-text rounded-3xl text-lg text-text placeholder:text-text py-5 pr-10 pl-5"
              type="number"
              name="tel"
              placeholder="Celular"
              onChange={handleInput}
            />
          </div>

          <div className="w-full h-8 lg:h-12 my-7 relative">
            <input
              className="w-full h-full bg-transparent outline-none border-2 border-solid border-text rounded-3xl text-lg text-text placeholder:text-text py-5 pr-10 pl-5"
              type="mail"
              name="email"
              placeholder="Email"
              onChange={handleInput}
            />
          </div>

          <div className="w-full h-8 lg:h-12 my-7 relative">
            <input
              className="w-full h-full bg-transparent outline-none border-2 border-solid border-text rounded-3xl text-lg text-text placeholder:text-text py-5 pr-10 pl-5"
              type="text"
              name="user"
              placeholder="Usuario"
              onChange={handleInput}
            />
          </div>

          <div className="w-full h-8 lg:h-12 my-7 relative">
            <input
              className="w-full h-full bg-transparent outline-none border-2 border-solid border-text rounded-3xl text-lg text-text placeholder:text-text py-5 pr-10 pl-5"
              type="password"
              name="pass"
              placeholder="Contraseña"
              onChange={handleInput}
            />
          </div>

          <div className="w-full h-8 lg:h-12 my-7 relative">
            <input
              className="w-full h-full bg-transparent outline-none border-2 border-solid border-text rounded-3xl text-lg text-text placeholder:text-text py-5 pr-10 pl-5"
              type="password"
              name="conf"
              placeholder="Confirma tu Contraseña"
              onChange={handleInput}
            />
          </div>

          {error && <span className="text-red-500">{error}</span>}

          <button
            type="submit"
            className="w-full h-10 bg-background outline-none rounded-3xl shadow-lg cursor-pointer text-lg font-bold hover:bg-secondary active:ring active:ring-accent">
            Continuar
          </button>

          <div className="text-base text-center mt-5 mb-4">
            <p>
              Ya tienes una cuenta?{" "}
              <Link to="/" className="no-underline font-bold hover:underline">
                Ingresa
              </Link>
            </p>
          </div>

        </form>

      </div>

    </div>
  );
}

export default Register