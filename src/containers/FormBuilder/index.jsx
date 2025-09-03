'use client';

// You're tasked with building a Mini Form Builder in React. The app should let users create a custom form dynamically using a simple builder interface.
// 🔧 Requirements
// UI Layout:
// Divide the screen into two sections:
// Left pane: Form Controls (builder)
// Right pane: Live Preview (form output)
// Functionality:
// Add Fields
//  Users should be able to add form fields of types:
// Text
// Number
// Checkbox

// Edit Labels
//  For each field added, users should be able to edit its label.

// Delete Fields
//  Users should be able to delete any added field.

// Live Preview
//  The right pane must display the form live as it's being constructed, using the current labels and field types.
// Add a Submit button to the preview pane. On form submission:
// Log the form's filled values (input and checkbox states) to the browser console in a clean JSON format.

import React from 'react';
import FormBuilder from '@/components/FormBuilder/FormBuilder';
import Preview from '@/components/FormBuilder/Preview';
import useFormBuilder from '@/containers/FormBuilder/useFormBuilder';

const Postman = () => {
	const { entries, addEntry, removeEntry, handleLabelChange, handleValueChange, handleSubmit } = useFormBuilder();

	return (
		<div className='flex items-start justify-evenly gap-6'>
			<FormBuilder
				entries={entries}
				addEntry={addEntry}
				removeEntry={removeEntry}
				handleLabelChange={handleLabelChange}
			/>
			<Preview entries={entries} handleValueChange={handleValueChange} />
			<button onClick={handleSubmit} className='border-2 bg-black text-white px-3 py-1 rounded-md h-fit'>
				Submit
			</button>
		</div>
	);
};

export default Postman;
