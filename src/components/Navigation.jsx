import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
	return (
		<nav>
			<div className='container'>
				<div className='brand'>
					<p>Culinier</p>
				</div>
				<button class='hamburger' type='button'>
					<span class='hamburger-box'>
						<span class='hamburger-inner'></span>
					</span>
				</button>
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
