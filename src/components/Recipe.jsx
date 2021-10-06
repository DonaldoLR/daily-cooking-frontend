import React from "react";
import { NavLink } from "react-router-dom";

export const Recipe = ({ recipe: { id, name, description, image } }) => {
	return (
		<div>
			<div className='card' style={{ width: "18rem" }}>
				<img src={image} className='card-img-top' alt='...' />
				<div className='card-body'>
					<h5 className='card-title'>{name}</h5>
					<p className='card-text'>{description}</p>
					<NavLink to={`recipes/${id}`} className='btn btn-primary'>
						Read More
					</NavLink>
				</div>
			</div>
		</div>
	);
};
