import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const EditRecipeForm = () => {
	const BASE_URL = process.env.REACT_APP_BASE_URL;
	const history = useHistory();
	const { id } = useParams();
	const [formData, setFormData] = useState({
		name: 'Loading...',
		description: 'Loading...',
		image: 'Loading...',
		instructions: [''],
	});
	const [serverErrors, setServerErrors] = useState([]);
	const [availableIngredients, setAvailableIngredients] = useState([]);
	const [recipeIngredients, setRecipeIngredients] = useState([
		{
			ingredientID: 0,
			ingredient_quantity: 0,
			ingredient_description: '',
			recipe_ingredient_id: 0,
		},
	]);
	useEffect(() => {
		fetch(`${BASE_URL}/ingredients`)
			.then((res) => res.json())
			.then(setAvailableIngredients);
	}, [BASE_URL]);
	useEffect(() => {
		fetch(`${BASE_URL}/recipes/${id}`)
			.then((res) => res.json())
			.then((data) => {
				let instructionsArray = data.instructions.split('/n ');
				if (instructionsArray.length === 0) {
					instructionsArray = [''];
				}
				let fetchedRecipeIngredientsArray =
					data.ingredients_with_additional_data.map((ingredient) => {
						return {
							ingredientID: ingredient.id,
							ingredient_quantity: ingredient.ingredient_quantity,
							ingredient_description: ingredient.ingredient_description,
							recipe_ingredient_id: ingredient.recipe_ingredient_id,
						};
					});
				if (fetchedRecipeIngredientsArray.length === 0) {
					fetchedRecipeIngredientsArray = [
						{
							ingredientID: 0,
							ingredient_quantity: 0,
							ingredient_description: '',
							recipe_ingredient_id: 0,
						},
					];
				}
				setRecipeIngredients(fetchedRecipeIngredientsArray);
				setFormData((prev) => {
					return {
						name: data.name,
						description: data.description,
						image: data.image,
						instructions: instructionsArray,
					};
				});
			});
	}, [BASE_URL, id]);
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
			// if (key !== 'ingredient_description') {
			// 	if (parseFloat(value) <= 0) {
			// 		updatedIngredientValues[index][key] = 0;
			// 	} else {
			// 		updatedIngredientValues[index][key] = parseFloat(value);
			// 	}
			// } else {
			// 	updatedIngredientValues[index][key] = value;
			// }
			updatedIngredientValues[index][key] = value;
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
				{
					ingredientID: 0,
					ingredient_quantity: 0,
					ingredient_description: '',
				},
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
		return sortedIngredients.map((ingredient, idx) => (
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
					value={input.ingredientID}
					onChange={(e) => handleInputChange(idx, e)}
					name='ingredientID'>
					{displayIngredientOptions()}
				</select>
				<label className='form-label' htmlFor='ingredient-quantity'>
					Quantity
				</label>
				<input
					type='text'
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
						className='button remove-item-btn form-button'
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
			description,
			recipe_ingredient_id
		) => {
			const response = await fetch(
				`${BASE_URL}/recipe_ingredients/${recipe_ingredient_id}`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						recipe_id: recipeID,
						ingredient_id: ingredientID,
						ingredient_quantity: quantity,
						ingredient_description: description,
					}),
				}
			);
			const data = await response.json();
			if (data.errors) {
				setServerErrors(data.errors);
			}
		};
		fetch(`${BASE_URL}/recipes/${id}`, {
			method: 'PATCH',
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
					setFormData({
						name: '',
						description: '',
						image: '',
						instructions: [''],
					});
					recipeIngredients.forEach((ingredient) => {
						submitIngredients(
							data.id,
							ingredient.ingredientID,
							parseFloat(ingredient.ingredient_quantity),
							ingredient.ingredient_description,
							ingredient.recipe_ingredient_id
						);
					});
					history.push('/');
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
	const handleDelete = (e) => {
		e.preventDefault();
		fetch(`${BASE_URL}/recipes/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				history.push('/');
				console.log(data);
			});
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
				<button className='button form-button' onClick={handleDelete}>
					Delete Recipe
				</button>
			</div>
		</form>
	);
};

export default EditRecipeForm;
