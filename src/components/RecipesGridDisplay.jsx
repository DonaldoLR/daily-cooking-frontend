import React, { useEffect, useState } from 'react';
import { RecipeCard } from './RecipeCard';

const RecipeGridDisplay = () => {
	const BASE_URL = process.env.REACT_APP_BASE_URL;

	const [recipes, setRecipes] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`${BASE_URL}/recipes`);
				const data = await response.json();
				setRecipes(data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchData();
	}, [BASE_URL]);

	const displayRecipes = () => {
		return recipes.map((recipe) => (
			<RecipeCard key={`${recipe.id} - ${recipe.name}`} recipe={recipe} />
		));
	};
	return (
		<div className='container'>
			<div className='filter-buttons'>
				<button>Food</button>
				<button>Beverages</button>
				<button>Dessert</button>
				<button>Pudding</button>
			</div>
			<div className='recipe-card-grid display-grid'>
				{recipes && displayRecipes()}
			</div>
		</div>
	);
};

export default RecipeGridDisplay;
