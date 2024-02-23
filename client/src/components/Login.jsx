import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios'

import LoginValidation from '../func/LoginValidation.js'

const Login = () => {
    const [values, setValues] = useState({
        username: '',
        password: ''
    })

    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        setError(LoginValidation(values))

        if (!(LoginValidation(values))) {
          axios
            .post("http://localhost:8081/login", values)
            .then((res) => {
              console.log(res.data);
              if (res.data === "Success") {
                navigate("/home");
              } else {
                setError("Credenciales incorrectas");
              }
            })
            .catch((err) => console.log(err));
        } else {
          console.log("no jalo");
        }
    }
    const handleInput = (event) => {
        setValues({...values, [event.target.name]: [event.target.value] });
    }

  return (
    <div className="flex justify-center items-center h-screen bg-background">
        
      <div className="w-80 lg:w-96 bg-primary text-text font-secondary font-semibold px-10 py-8 rounded-xl shadow-custom">

        <form onSubmit={handleSubmit}>
          <h1 className="font-primary font-bold text-4xl text-center">Login</h1>

          <div className="w-full h-12 my-7 relative">
            <input
              className="w-full h-full bg-transparent outline-none border-2 border-solid border-text rounded-3xl text-lg text-text placeholder:text-text py-5 pr-10 pl-5"
              type="text"
              name="username"
              placeholder="Usuario"
              onChange={handleInput}
            />
            <i className="bx bxs-user absolute right-5 translate-y-1/2 text-[25px]"></i>
          </div>

          <div className="w-full h-12 my-7 relative">
            <input
              className="w-full h-full bg-transparent outline-none border-2 border-solid border-text rounded-3xl text-lg text-text placeholder:text-text py-5 pr-10 pl-5"
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={handleInput}
            />
            <i className="bx bxs-lock-alt absolute right-5 translate-y-1/2 text-[25px]"></i>
          </div>

          {error && <span className="text-red-500">{error}</span>}

          <button
            type="submit"
            className="w-full h-10 bg-background outline-none rounded-3xl shadow-lg cursor-pointer text-lg font-bold hover:bg-secondary active:ring active:ring-accent"
          >
            Ingresar
          </button>

          <div className="text-base text-center mt-5 mb-4">
            <p>
              No tienes una cuenta?{" "}
              <Link
                to="/register"
                className="no-underline font-bold hover:underline"
              >
                Registrate
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login