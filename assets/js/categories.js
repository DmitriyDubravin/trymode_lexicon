import React, {Component} from 'react';

export default function Categories({allCategories, chosenCategory, setCategory}) {
	let placeholder = 'Select category';
	let categoriesList = allCategories.map((item,i) => <option key={i}>{item}</option>);
	return (
		<form>
			<select onChange={setCategory} defaultValue={chosenCategory}>
				<option>{placeholder}</option>
				{categoriesList}
			</select>
		</form>
	);
}


