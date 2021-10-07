import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const RecipePage = () => {
	const BASE_URL = process.env.REACT_APP_BASE_URL;
	const { id } = useParams();
	const [recipe, setRecipe] = useState(null);
	useEffect(() => {
		fetchRecipe();
	}, []);
	const fetchRecipe = async () => {
		const response = await fetch(`${BASE_URL}/recipes/${id}`);
		const data = await response.json();
		setRecipe(data);
	};
	const displayRecipe = () => {
		const {
			name,
			description,
			image,
			instructions,
			ingredients_with_additional_data,
		} = recipe;
		const ingredientsList = ingredients_with_additional_data.map(
			(ingredient) => (
				<li key={`${ingredient.id} - ${ingredient.name}`}>
					{ingredient.ingredient_description}
				</li>
			)
		);
		const instructionsList = () => {
			const instructionsArray = instructions.split("/n");
			return instructionsArray.map((step, idx) => (
				<li key={`${idx} - step`}>{step}</li>
			));
		};
		return (
			<div>
				<h1>{name}</h1>
				<img src={image} alt='...' />
				<p>{description}</p>
				<div>
					<div>
						<h2>Ingredients</h2>
						<ul>{ingredientsList}</ul>
					</div>
				</div>
				<div>
					<h2>Directions</h2>
					<ul>{instructionsList()}</ul>
				</div>
			</div>
		);
	};
	return <div>{recipe && displayRecipe()}</div>;
};

export default RecipePage;