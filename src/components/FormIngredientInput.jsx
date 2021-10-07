import React, { useState, useEffect } from "react";

const FormIngredientInput = ({ ingredientFields, setIngredientFields }) => {
	const BASE_URL = process.env.REACT_APP_BASE_URL;
	// State used for available Ingredients
	const [ingredientOptions, setIngredientOptions] = useState([]);
	// State used for Form Input

	// Fetch Ingredients available
	useEffect(() => {
		const fetchIngredientOptions = async () => {
			const response = await fetch(`${BASE_URL}/ingredients`);
			const data = await response.json();
			setIngredientOptions(data);
		};
		fetchIngredientOptions();
	}, []);
	// Sorts the ingredients and return options html tags used in the form's select tags
	const displayIngredientOptions = () => {
		const sortedIngredients = ingredientOptions.sort((a, b) => {
			return a.name.localeCompare(b.name);
		});
		return sortedIngredients.map((ingredient) => (
			<option
				key={`${ingredient.id} - ${ingredient.name}`}
				value={ingredient.id}
			>
				{ingredient.name}
			</option>
		));
	};
	const handleInputChange = (idx, e) => {
		const values = [...ingredientFields];
		if (e.target.name !== "ingredient_description") {
			values[idx][e.target.name] = parseInt(e.target.value, 10);
		} else {
			values[idx][e.target.name] = e.target.value;
		}
		setIngredientFields(values);
	};
	// Added another input box for another ingredient
	const handleAddIngredient = () => {
		setIngredientFields((data) => [
			...data,
			{ ingredientID: 0, ingredient_quantity: 0, ingredient_description: "" },
		]);
	};
	// Removes the input box
	const handleRemoveIngredient = (idx, e) => {
		if (ingredientFields.length === 1) {
			console.log("Cant remove all fields");
		} else {
			const updatedFields = ingredientFields.filter(
				(inputField, index) => index !== idx
			);
			setIngredientFields(updatedFields);
		}
	};
	const displayIngredientInputs = () => {
		return ingredientFields.map((inputField, idx) => (
			<div className='input-group'>
				<label className='form-label'>
					Ingredient
					<select
						className='form-select'
						aria-label='Default select example'
						value={inputField.ingredientID}
						onChange={(e) => handleInputChange(idx, e)}
						name='ingredientID'
					>
						{displayIngredientOptions()}
					</select>
				</label>
				<label className='form-label'>
					Quantity
					<input
						type='number'
						aria-label='Quantity'
						className='form-control'
						value={inputField.ingredient_quantity}
						onChange={(e) => handleInputChange(idx, e)}
						name='ingredient_quantity'
					/>
				</label>
				<label className='form-label'>
					Description
					<input
						type='text'
						aria-label='Description'
						className='form-control'
						value={inputField.ingredient_description}
						onChange={(e) => handleInputChange(idx, e)}
						name='ingredient_description'
					/>
				</label>
				<button
					type='button'
					className='btn btn-outline-success'
					onClick={handleAddIngredient}
				>
					Add Ingredient
				</button>
				<button
					type='button'
					className='btn btn-outline-danger'
					onClick={(event) => handleRemoveIngredient(idx, event)}
				>
					Remove Ingredient
				</button>
			</div>
		));
	};
	return <>{displayIngredientInputs()}</>;
};

export default FormIngredientInput;
