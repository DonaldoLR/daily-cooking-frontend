import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
	const [menuToggle, setMenuToggle] = useState(false);

	const toggleMenu = () => {
		setMenuToggle(!menuToggle);
	};
	return (
		<nav>
			<div className='container'>
				<div className='brand'>
					<NavLink to='/'>Culinier</NavLink>
				</div>
				<button
					className={
						'hamburger hamburger--spin ' + (menuToggle ? 'is-active' : '')
					}
					type='button'
					onClick={toggleMenu}>
					<span className='hamburger-box'>
						<span className='hamburger-inner'></span>
					</span>
				</button>
				<ul className={menuToggle ? 'open' : ''}>
					<li>
						<NavLink to='/' onClick={toggleMenu}>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink to='/recipes' onClick={toggleMenu}>
							Recipes
						</NavLink>
					</li>
					{/* <li>
						<NavLink to='/blog' onClick={toggleMenu}>Blog</NavLink>
					</li>
					<li>
						<NavLink to='/gallary' onClick={toggleMenu}>Gallary</NavLink>
					</li>
					<li>
						<NavLink to='/about' onClick={toggleMenu}>About</NavLink>
					</li>
					<li>
						<NavLink to='/contact' onClick={toggleMenu}>Contact</NavLink>
					</li>
					<li>
						<NavLink to='/login' onClick={toggleMenu}>Login</NavLink>
					</li> */}
					<li>
						<NavLink to='/recipes/new' onClick={toggleMenu}>
							Create Recipe
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navigation;
