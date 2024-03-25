import React from 'react';
import { Link } from 'react-router-dom';
const AdminNavbar = ({ title, userId }) => {
	return (
		<header className='bg-primary '>
			<nav className='text-text flex justify-between items-center mx-auto px-8 py-2'>
				<div>
					<h1 className='text-4xl font-primary'>{title}</h1>
				</div>

				<div className='nav-links md:static absolute bg-primary md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto w-full flex items-center px-5'>
					<ul className='text-xl font-secondary flex md:flex-row flex-col md:items-center md:gap-20 gap-8'>
						<li>
							<Link to='/agregar/moderador'>
								Agregar Moderador
							</Link>
						</li>
						<li>
							<Link
								to={{
									pathname: '/agregar/torre',
									state: { userId },
								}}>
								Agregar Torre
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default AdminNavbar;
