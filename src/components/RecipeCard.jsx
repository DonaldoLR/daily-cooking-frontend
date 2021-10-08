import React from "react";
import { NavLink } from "react-router-dom";

export const RecipeCard = ({ recipe: { id, name, description, image } }) => {
	return (
		<div
			className='card border-dark mb-3 col-sm-12 col-md-6 mx-auto'
			style={{ width: "18rem" }}
		>
			<img src={image} className='card-img-top' alt='...' />
			<div className='card-body'>
				<h5 className='card-title'>{name}</h5>
				<p className='card-text'>{description}</p>
			</div>
			<div className='card-footer'>
				<NavLink to={`recipes/${id}`} className='btn btn-outline-primary'>
					Read More
				</NavLink>
				<NavLink
					to={`recipes/${id}/edit`}
					className='btn btn-outline-secondary'
				>
					Edit Recipe
				</NavLink>
			</div>
		</div>
	);
};
