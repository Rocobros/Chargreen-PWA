import React from 'react'
import Login from "./components/Login";
import Register from './components/Register';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path='/register'element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
