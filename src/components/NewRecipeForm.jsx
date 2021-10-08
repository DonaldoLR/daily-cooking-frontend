import React, { useState, useEffect } from "react";

const NewRecipeForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		image: "",
		instructions: [""],
	});
	const [availableIngredients, setAvailableIngredients] = useState([]);
	const [recipeIngredients, setRecipeIngredients] = useState([
		{ ingredientID: 0, ingredient_quantity: 0, ingredient_description: "" },
	]);
	useEffect(() => {
		const BASE_URL = process.env.REACT_APP_BASE_URL;
		fetch(`${BASE_URL}/ingredients`)
			.then((res) => res.json())
			.then(setAvailableIngredients);
	}, []);
	const handleInputChange = (index, e) => {
		const key = e.target.name;
		const value = e.target.value;
		const ingredientInputNames = [
			"ingredientID",
			"ingredient_quantity",
			"ingredient_description",
		];
		if (key === "instruction") {
			const updatedInstructions = formData.instructions.map(
				(instruction, idx) => {
					if (idx === index) {
						return e.target.value;
					} else {
						return instruction;
					}
				}
			);
			setFormData({ ...formData, ["instructions"]: updatedInstructions });
		} else if (ingredientInputNames.includes(key)) {
			const updatedIngredientValues = [...recipeIngredients];
			if (key !== "ingredient_description") {
				updatedIngredientValues[index][key] = parseInt(value, 10);
			} else {
				updatedIngredientValues[index][key] = value;
			}
			setRecipeIngredients(updatedIngredientValues);
		}
	};
	const addInput = (e) => {
		const key = e.target.name;
		if (key === "ingredient") {
			const updatedIngredients = [
				...recipeIngredients,
				{ ingredientID: 0, ingredient_quantity: 0, ingredient_description: "" },
			];
			setRecipeIngredients(updatedIngredients);
		} else {
			const updatedInstructions = [...formData.instructions, ""];
			setFormData({ ...formData, ["instructions"]: updatedInstructions });
		}
	};
	const removeInput = (idx, e) => {
		if (e.target.name === "ingredient") {
			if (recipeIngredients.length === 1) {
				console.log(`can not remove all inputs`);
			} else {
				const updatedIngredients = recipeIngredients.filter(
					(ingredient, index) => index !== idx
				);
				setRecipeIngredients(updatedIngredients);
			}
		} else {
			if (formData.instructions.length === 1) {
				console.log(`can not remove all inputs`);
			} else {
				const updatedInstructions = formData.instructions.filter(
					(step, index) => index !== idx
				);
				setFormData({ ...formData, ["instructions"]: updatedInstructions });
			}
		}
	};
	const displayInstructionInputs = () => {
		return formData.instructions.map((instruction, index) => (
			<div className='mb-3'>
				<label className='form-label'>
					Step:
					<input
						type='text'
						className='form-control'
						value={instruction}
						name='instruction'
						onChange={(e) => handleInputChange(index, e)}
					/>
				</label>
				<button
					type='button'
					className='btn btn-outline-success'
					onClick={addInput}
				>
					Add Step
				</button>
				<button
					type='button'
					className='btn btn-outline-danger'
					onClick={(e) => removeInput(index, e)}
				>
					Remove Step
				</button>
			</div>
		));
	};
	const displayIngredientOptions = () => {
		const sortedIngredients = availableIngredients.sort((a, b) => {
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
	const displayIngredientInputs = () => {
		return recipeIngredients.map((input, idx) => (
			<div key={idx} className='input-group'>
				<label className='form-label'>
					Ingredient
					<select
						className='form-select'
						aria-label='Default select example'
						value={input.ingredientID}
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
						value={input.ingredient_quantity}
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
						value={input.ingredient_description}
						onChange={(e) => handleInputChange(idx, e)}
						name='ingredient_description'
					/>
				</label>
				<button
					type='button'
					className='btn btn-outline-success'
					onClick={addInput}
					name='ingredient'
				>
					Add Ingredient
				</button>
				<button
					type='button'
					className='btn btn-outline-danger'
					onClick={(event) => removeInput(idx, event)}
					name='ingredient'
				>
					Remove Ingredient
				</button>
			</div>
		));
	};
	return (
		<form>
			{displayIngredientInputs()}
			{displayInstructionInputs()}
			<button type='submit' className='btn btn-primary'>
				Submit
			</button>
		</form>
	);
};

export default NewRecipeForm;
