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
				<ul className={menuToggle && 'open'}>
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
						<NavLink to='/newRecipe' onClick={toggleMenu}>
							Create Recipe
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navigation;
{
	/* <nav className='navbar sticky-top navbar-expand-lg navbar-dark bg-dark mb-5'>
	<div className='container-fluid'>
		<NavLink className='navbar-brand' to='#'>
			Daily Cooking
		</NavLink>
		<button
			className='navbar-toggler'
			type='button'
			data-bs-toggle='collapse'
			data-bs-target='#navbarSupportedContent'
			aria-controls='navbarSupportedContent'
			aria-expanded='false'
			aria-label='Toggle navigation'
		>
			<span className='navbar-toggler-icon'></span>
		</button>
		<div className='collapse navbar-collapse' id='navbarSupportedContent'>
			<ul className='navbar-nav me-auto mb-2 mb-lg-0 '>
				<li className='nav-item'>
					<NavLink className='nav-link active' aria-current='page' to='/'>
						Home
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink className='nav-link' to='/recipes'>
						Recipes
					</NavLink>
				</li>
			</ul>
		</div>
		<NavLink className='btn btn-outline-success' to='/recipes/new'>
			Create Recipe
		</NavLink>
	</div>
</nav> */
}
