import React from "react";

const FormInstructionsInput = ({ instructionSteps, setInstructionSteps }) => {
	const handleInputChange = (idx, e) => {
		const values = [...instructionSteps];
		values[idx][e.target.name] = e.target.value;
		setInstructionSteps(values);
	};
	const handleAddStep = () => {
		setInstructionSteps((data) => [
			...data,
			{
				instruction: "",
			},
		]);
	};
	const handleRemoveStep = (idx, e) => {
		if (instructionSteps.length === 1) {
			console.log("Cant Remove all elements");
		} else {
			const updatedFields = instructionSteps.filter(
				(inputField, index) => index !== idx
			);
			setInstructionSteps(updatedFields);
		}
	};
	const displayInstructionInputs = () => {
		return instructionSteps.map((instructionStep, idx) => (
			<div className='input-group'>
				<label className='form-label'>
					Instruction Step
					<input
						type='text'
						aria-label='Instruction'
						className='form-control'
						value={instructionStep.instruction}
						onChange={(e) => handleInputChange(idx, e)}
						name='instruction'
					/>
				</label>
				<button
					type='button'
					className='btn btn-outline-success'
					onClick={handleAddStep}
				>
					Add Step
				</button>
				<button
					type='button'
					className='btn btn-outline-danger'
					onClick={(event) => handleRemoveStep(idx, event)}
				>
					Remove Step
				</button>
			</div>
		));
	};
	return <>{displayInstructionInputs()}</>;
};

export default FormInstructionsInput;
