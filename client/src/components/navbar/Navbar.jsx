import React from 'react'
import toggleMenu from '../../func/NavbarMenu.js';
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({title}) => {
  return (
    <header className="bg-primary ">
      <nav className="text-text flex justify-between items-center mx-auto px-8 py-2">
        <div>
          <h1 className="text-4xl font-primary">{title}</h1>
        </div>

        <div className="nav-links md:static absolute bg-primary md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto w-full flex items-center px-5">
          <ul className="text-xl font-secondary flex md:flex-row flex-col md:items-center md:gap-20 gap-8">
            <li>
              <a className="hover:text-accent" href="#">
                Inicio
              </a>
            </li>
            <li>
              <a className="hover:text-accent" href="">
                Novedades
              </a>
            </li>
            <li>
              <a className="hover:text-accent" href="#">
                Cargar
              </a>
            </li>
            <li>
              <a className="hover:text-accent" href="#">
                Mapa
              </a>
            </li>
            <li>
              <a className="hover:text-accent" href="">
                Metricas
              </a>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-6">
          <Link to='/editUser'>
            <span className="">
              <i className="bx bxs-user text-3xl"></i>
            </span>
          </Link>

          <Link>
            <span className="">
              <i className="bx bxs-lock text-3xl"></i>
            </span>
          </Link>

            <span>
                <i onClick={toggleMenu} className='bx bx-menu text-3xl md:hidden'></i>
            </span>
        </div>
      </nav>
    </header>
  );
}

export default Navbar