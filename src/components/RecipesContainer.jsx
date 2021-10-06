import React, { useEffect, useState } from "react";

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
		return recipes.map((recipe) => {
			<div class='card' style={{ width: "18rem" }}>
				<img src='...' class='card-img-top' alt='...' />
				<div class='card-body'>
					<h5 class='card-title'>Card title</h5>
					<p class='card-text'>
						Some quick example text to build on the card title and make up the
						bulk of the card's content.
					</p>
					<a href='#' class='btn btn-primary'>
						Go somewhere
					</a>
				</div>
			</div>;
		});
	};
	return <div>{recipes && displayRecipes()}</div>;
};

export default RecipesContainer;
