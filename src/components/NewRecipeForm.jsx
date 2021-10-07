import React, { useState, useEffect } from "react";
import FormIngredientInput from "./FormIngredientInput";

const NewRecipeForm = () => {
	const initialFormData = {
		name: "",
		description: "",
		image: "",
		instructions: "",
	};
	const [formData, setFormData] = useState(initialFormData);
	const [inputFields, setInputFields] = useState([
		{
			ingredientID: 0,
			ingredient_quantity: 0,
			ingredient_description: "",
		},
	]);
	return (
		<form>
			<div className='mb-3'>
				<label htmlFor='recipeTitle' className='form-label'>
					Recipe Title
				</label>
				<input type='text' className='form-control' id='recipeTitle' />
			</div>
			<div className='mb-3'>
				<label htmlFor='recipeDescription' className='form-label'>
					Recipe Title
				</label>
				<textarea type='text' className='form-control' id='recipeDescription' />
			</div>
			<div className='mb-3'>
				<label htmlFor='recipeImage' className='form-label'>
					Image Preview
				</label>
				<input type='text' className='form-control' id='recipeImage' />
			</div>
			<FormIngredientInput
				inputFields={inputFields}
				setInputFields={setInputFields}
			/>
			<button type='submit' className='btn btn-primary'>
				Submit
			</button>
		</form>
	);
};

export default NewRecipeForm;
