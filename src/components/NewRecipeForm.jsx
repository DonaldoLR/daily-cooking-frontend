import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
const NewRecipeForm = () => {
	const BASE_URL = process.env.REACT_APP_BASE_URL;
	const history = useHistory();
	const [formData, setFormData] = useState({
		name: '',
		description: '',
		image: '',
		instructions: [''],
	});
	const [serverErrors, setServerErrors] = useState([]);
	const [availableIngredients, setAvailableIngredients] = useState(null);
	const [recipeIngredients, setRecipeIngredients] = useState([
		{ ingredientID: 0, ingredient_quantity: 0, ingredient_description: '' },
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
			'ingredientID',
			'ingredient_quantity',
			'ingredient_description',
		];
		if (key === 'instruction') {
			const updatedInstructions = formData.instructions.map(
				(instruction, idx) => {
					if (idx === index) {
						return e.target.value;
					} else {
						return instruction;
					}
				}
			);
			setFormData({ ...formData, instructions: updatedInstructions });
		} else if (ingredientInputNames.includes(key)) {
			const updatedIngredientValues = [...recipeIngredients];
			if (key !== 'ingredient_description') {
				if (value === '') {
					updatedIngredientValues[index][key] = 0;
				} else {
					updatedIngredientValues[index][key] = parseInt(value, 10);
				}
			} else {
				updatedIngredientValues[index][key] = value;
			}
			setRecipeIngredients(updatedIngredientValues);
		} else {
			setFormData({ ...formData, [key]: value });
		}
	};
	const addInput = (e) => {
		e.preventDefault();
		const key = e.target.name;
		if (key === 'ingredient') {
			const updatedIngredients = [
				...recipeIngredients,
				{ ingredientID: 0, ingredient_quantity: 0, ingredient_description: '' },
			];
			setRecipeIngredients(updatedIngredients);
		} else {
			const updatedInstructions = [...formData.instructions, ''];
			setFormData({ ...formData, instructions: updatedInstructions });
		}
	};
	const removeInput = (idx, e) => {
		e.preventDefault();
		if (e.target.name === 'ingredient') {
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
				setFormData({ ...formData, instructions: updatedInstructions });
			}
		}
	};
	const displayInstructionInputs = () => {
		return formData.instructions.map((instruction, index) => (
			<div key={index} className='instructions-input-container'>
				<label className='form-label' htmlFor='instruction-input'>
					Step:
				</label>
				<textarea
					rows='4'
					type='text'
					className='form-control'
					id='instruction-input'
					value={instruction}
					name='instruction'
					onChange={(e) => handleInputChange(index, e)}
				/>
				<div className='form-button-containers'>
					<button
						type='button'
						className='button form-button'
						onClick={(e) => removeInput(index, e)}>
						Remove Step
					</button>
				</div>
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
				value={ingredient.id}>
				{ingredient.name}
			</option>
		));
	};
	const displayIngredientInputs = () => {
		return recipeIngredients.map((input, idx) => (
			<div key={idx} className='input-group ingredient-input-container'>
				<label className='form-label' htmlFor='ingredient-selection'>
					Ingredient
				</label>
				<select
					id='ingredient-selection'
					value={0}
					onChange={(e) => handleInputChange(idx, e)}
					name='ingredientID'>
					<option key={`default ingredient selection`} defaultValue>
						Please select an ingredient
					</option>
					{displayIngredientOptions()}
				</select>
				<label className='form-label' htmlFor='ingredient-quantity'>
					Quantity
				</label>
				<input
					type='number'
					id='ingredient-quantity'
					value={input.ingredient_quantity}
					onChange={(e) => handleInputChange(idx, e)}
					name='ingredient_quantity'
				/>
				<label className='form-label' htmlFor='ingredient-description'>
					Description
				</label>
				<textarea
					rows='4'
					type='text'
					id='ingredient-description'
					value={input.ingredient_description}
					onChange={(e) => handleInputChange(idx, e)}
					name='ingredient_description'
				/>
				<div className='form-button-containers'>
					<button
						className='button form-button'
						onClick={(event) => removeInput(idx, event)}
						name='ingredient'>
						Remove Ingredient
					</button>
				</div>
			</div>
		));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const instructions = formData.instructions
			.map((instruction) => instruction.trim())
			.join('. /n ');
		const finalFormData = { ...formData, instructions: instructions };
		const submitIngredients = async (
			recipeID,
			ingredientID,
			quantity,
			description
		) => {
			const response = await fetch(`${BASE_URL}/recipe_ingredients`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					recipe_id: recipeID,
					ingredient_id: ingredientID,
					ingredient_quantity: quantity,
					ingredient_description: description,
				}),
			});
			const data = await response.json();
			if (data.errors) {
				setServerErrors(data.errors);
			}
		};
		fetch(`${BASE_URL}/recipes`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(finalFormData),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.errors) {
					setServerErrors(data.errors);
				} else {
					recipeIngredients.forEach((ingredient) => {
						submitIngredients(
							data.id,
							ingredient.ingredientID,
							ingredient.ingredient_quantity,
							ingredient.ingredient_description
						);
					});
					if (serverErrors.length === 0) {
						setFormData({
							name: '',
							description: '',
							image: '',
							instructions: [''],
						});
						history.push('/');
					}
				}
			});
	};
	const displayErrors = () => {
		return serverErrors.map((error, idx) => (
			<div key={`${idx} - ${error}`} className='alert alert-danger w-25'>
				{error}
			</div>
		));
	};
	return (
		<form onSubmit={handleSubmit} className='container display-grid'>
			{displayErrors()}
			<div className='recipe-info-container'>
				<div className='mb-3'>
					<label className='form-label' htmlFor='recipe-title'>
						Recipe Title:
					</label>
					<input
						type='text'
						className='form-control'
						name='name'
						id='recipe-title'
						onChange={(e) => handleInputChange(null, e)}
						value={formData.name}
					/>
				</div>
				<div className='mb-3'>
					<label className='form-label' htmlFor='recipe-image'>
						Recipe Image Preview:
					</label>
					<input
						type='text'
						className='form-control'
						name='image'
						id='recipe-image'
						onChange={(e) => handleInputChange(null, e)}
						value={formData.image}
					/>
				</div>
				<div className='mb-3'>
					<label className='form-label' htmlFor='recipe-description'>
						Short Description:
					</label>
					<textarea
						rows='4'
						type='text'
						className='form-control'
						name='description'
						id='recipe-description'
						onChange={(e) => handleInputChange(null, e)}
						value={formData.description}
					/>
				</div>
			</div>
			<div className='display-grid ingredients-container'>
				<h2>Ingredients:</h2>
				{availableIngredients && displayIngredientInputs()}
				<div className='form-button-containers'>
					<button
						className='button add-item-btn form-button'
						onClick={addInput}
						name='ingredient'>
						Add Ingredient
					</button>
				</div>
			</div>
			<div className='display-grid instructions-container'>
				<h2>Instructions</h2>
				{displayInstructionInputs()}
				<div className='form-button-containers'>
					<button
						type='button'
						className='button form-button'
						onClick={addInput}>
						Add Step
					</button>
				</div>
			</div>
			<div className='form-button-containers'>
				<button type='submit' className='button form-button'>
					Submit
				</button>
			</div>
		</form>
	);
};

export default NewRecipeForm;
