import React, { useEffect, useState } from "react";
import { Recipe } from "./Recipe";

const RecipesContainer = () => {
	const BASE_URL = process.env.REACT_APP_BASE_URL;

	const [recipes, setRecipes] = useState(null);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await fetch(`${BASE_URL}/recipes`);
			const data = await response.json();
			setRecipes(data);
		} catch (err) {
			console.log(err);
		}
	};

	const displayRecipes = () => {
		return recipes.map((recipe) => <Recipe recipe={recipe} />);
	};
	return <div>{recipes && displayRecipes()}</div>;
};

export default RecipesContainer;
