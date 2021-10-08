import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
const NewRecipeForm = () => {
	const BASE_URL = process.env.REACT_APP_BASE_URL;
	const history = useHistory();
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		image: "",
		instructions: [""],
	});
	const [serverErrors, setServerErrors] = useState([]);
	const [availableIngredients, setAvailableIngredients] = useState([]);
	const [recipeIngredients, setRecipeIngredients] = useState([
		{ ingredientID: 0, ingredient_quantity: 0, ingredient_description: "" },
	]);
	useEffect(() => {
		fetch(`${BASE_URL}/ingredients`)
			.then((res) => res.json())
			.then(setAvailableIngredients);
	}, [BASE_URL]);
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
		} else {
			setFormData({ ...formData, [key]: value });
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
	const handleSubmit = (e) => {
		e.preventDefault();
		const instructions = formData.instructions
			.map((instruction) => instruction.trim())
			.join(". /n ");
		const finalFormData = { ...formData, ["instructions"]: instructions };
		const submitIngredients = async (
			recipeID,
			ingredientID,
			quantity,
			description
		) => {
			const response = await fetch(`${BASE_URL}/recipe_ingredients`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					recipe_id: recipeID,
					ingredient_id: ingredientID,
					ingredient_quantity: quantity,
					ingredient_description: description,
				}),
			});
			const data = await response.json();
		};
		fetch(`${BASE_URL}/recipes`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(finalFormData),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.errors) {
					setServerErrors(data.errors);
				} else {
					setFormData({
						name: "",
						description: "",
						image: "",
						instructions: [""],
					});
					recipeIngredients.forEach((ingredient) => {
						submitIngredients(
							data.id,
							ingredient.ingredientID,
							ingredient.ingredient_quantity,
							ingredient.ingredient_description
						);
					});
					history.push("/");
				}
			});
	};
	const displayErrors = () => {
		return serverErrors.map((error, idx) => (
			<div key={`${idx} - ${error}`} className='alert alert-danger'>
				{error}
			</div>
		));
	};
	return (
		<form onSubmit={handleSubmit}>
			{displayErrors()}
			<div className='mb-3'>
				<label className='form-label'>
					Recipe Title:
					<input
						type='text'
						className='form-control'
						name='name'
						onChange={(e) => handleInputChange(null, e)}
						value={formData.name}
					/>
				</label>
			</div>
			<div className='mb-3'>
				<label className='form-label'>
					Recipe Description:
					<input
						type='text'
						className='form-control'
						name='description'
						onChange={(e) => handleInputChange(null, e)}
						value={formData.description}
					/>
				</label>
			</div>
			<div className='mb-3'>
				<label className='form-label'>
					Recipe Image Preview:
					<input
						type='text'
						className='form-control'
						name='image'
						onChange={(e) => handleInputChange(null, e)}
						value={formData.image}
					/>
				</label>
			</div>
			{displayIngredientInputs()}
			{displayInstructionInputs()}
			<button type='submit' className='btn btn-primary'>
				Submit
			</button>
		</form>
	);
};

export default NewRecipeForm;
