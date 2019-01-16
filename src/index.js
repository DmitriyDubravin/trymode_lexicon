import React, { useState, useEffect } from 'react';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import {render} from 'react-snapshot';
// import Settings from './js/settings';
import query from './server';

// import store from './js/store';


import './App.css';
import Home from './js/home';
import Add from './js/add';
import Edit from './js/edit';
import Delete from './js/delete';

// troubles
// after adding new term categories are not reloading
// after deleting last term of category error...
// no categories reload after new term added



const App = () => {

	const [ allCategories, setAllCategories ] = useState(null);
	const [ chosenCategory, setChosenCategory ] = useState(null);
	const [ id, setId ] = useState(null);
	const [ error, setError ] = useState(null);
	const [ view, setView ] = useState(null);


	useEffect(() => {
		getCategories();
	}, []);

	function changeView(view, e, id) {
		if(e !== undefined) e.preventDefault();
		let newId = id !== undefined ? id : null;
		setView(view);
		setId(newId);
	}
	async function getCategories() {
		let options = {
			lexicon: 'get_categories'
		};

		const response = await query({ data: options });
		setView('game');
		setAllCategories(response);
		setChosenCategory(null);
		setId(null);

	}
	async function deleteTerm(e) {
		e.preventDefault();
		let options = {
			lexicon: 'delete_term',
			id: id
		};

		await query({ data: options });
		getCategories();

	}
	function setCategory(e) {
		let chosenCategory = e.target.value !== 'Select category' ? e.target.value : null;
		setChosenCategory(chosenCategory);
	}

	async function addTerm(category, term, definition) {

		const options = {
			lexicon: 'add_term',
			category: category,
			term: term,
			definition: definition
		}

		await query({ data: options });

	}
	function addHandler(e, obj) {
		e.preventDefault();
		if(obj.category.value === 'Select category' && obj.newCategory.value === '') {
			setError('Error: Choose category or add new one');
		} else if(obj.term.value === '' || obj.definition.value === '') {
			setError('Error: Fill in "Term" and "Definition" fields');
		} else {
			let category = obj.category.value;
			if(obj.newCategory.value !== '') {
				category = obj.newCategory.value;
			}
			let term = obj.term.value;
			let definition = obj.definition.value
			addTerm(category, term, definition);
			getCategories();
		}
	}

	if (!allCategories) return null;

	if(view === 'game') {
		return <Home
					allCategories={allCategories}
					chosenCategory={chosenCategory}
					setCategory={setCategory}
					changeView={changeView}
				/>
	} else if(view === 'add') {
		return <Add
					error={error}
					allCategories={allCategories}
					addHandler={addHandler}
					changeView={changeView}
				/>
	} else if(view === 'edit') {
		return <Edit
					allCategories={allCategories}
					id={id}
					changeView={changeView}
				/>
	} else if(view === 'delete') {
		return <Delete
					deleteTerm={deleteTerm}
					changeView={changeView}
				/>
	} else {
		return <div className="loading"><img src="images/preloader.gif" alt="" /></div>
	}
};


render(
	<App />
	, document.querySelector('#root')
);