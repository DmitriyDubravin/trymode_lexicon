import React, {Component} from 'react';
import {render} from 'react-dom';
import Settings from './settings';

import store from './store';

console.log(store);

import Home from './home';
import Add from './add';
import Edit from './edit';
import Delete from './delete';

// troubles
// after adding new term categories are not reloading
// after deleting last term of category error...
// no categories reload after new term added


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			view: null,
			allCategories: null,
			chosenCategory: null,
			id: null,
			error: null
		}
		this.getCategories = this.getCategories.bind(this);
		this.setCategory = this.setCategory.bind(this);
		this.changeView = this.changeView.bind(this);
		this.deleteTerm = this.deleteTerm.bind(this);
		this.addHandler = this.addHandler.bind(this);
		this.addTerm = this.addTerm.bind(this);
	}
	changeView(view, e, id) {
		if(e !== undefined) e.preventDefault();
		let newId = id !== undefined ? id : null;
		this.setState({view: view, id: newId});
	}
	componentDidMount() {
		this.getCategories();
	}
	getCategories() {
		let options = {
			lexicon: 'get_categories'
		};
		fetch(Settings.server, {
			method: 'POST',
			headers: {'Content-Type': 'text/plain'},
			body: JSON.stringify(options)
		})
		.then(response => response.json())
		.then(data => {
			this.setState({view: 'game', allCategories: data, chosenCategory: null, id: null});
		});
	}
	deleteTerm(e) {
		e.preventDefault();
		let options = {
			lexicon: 'delete_term',
			id: this.state.id
		};
		fetch(Settings.server, {
			method: 'POST',
			headers: {'Content-Type': 'text/plain'},
			body: JSON.stringify(options)
		})
		.then(response => response.text())
		.then(data => {
			console.log(data);
			this.getCategories();
		});
	}
	setCategory(e) {
		let chosenCategory = e.target.value !== 'Select category' ? e.target.value : null;
		this.setState({chosenCategory: chosenCategory});
	}



// add term
	addTerm(category, term, definition) {
		fetch(Settings.server, {
			method: 'POST',
			headers: {'Content-Type': 'text/plain'},
			body: JSON.stringify(
				{
					lexicon: 'add_term',
					category: category,
					term: term,
					definition: definition
				}
			)
		})
		.then(response => response.text())
		.then(data => {
			console.log(data);
		});
	}
	addHandler(e, obj) {
		e.preventDefault();
		if(obj.category.value === 'Select category' && obj.newCategory.value === '') {
			this.setState({error: 'Error: Choose category or add new one'});
		} else if(obj.term.value === '' || obj.definition.value === '') {
			this.setState({error: 'Error: Fill in "Term" and "Definition" fields'});
		} else {
			let category = obj.category.value;
			if(obj.newCategory.value !== '') {
				category = obj.newCategory.value;
			}
			let term = obj.term.value;
			let definition = obj.definition.value
			this.addTerm(category, term, definition);
			this.getCategories();
		}
	}



	render() {
		let {view, allCategories, chosenCategory, id, error} = this.state;
		if(view === 'game') {
			return <Home
						allCategories={allCategories}
						chosenCategory={chosenCategory}
						setCategory={this.setCategory}
						changeView={this.changeView}
					/>
		} else if(view === 'add') {
			return <Add
						error={error}
						allCategories={allCategories}
						addHandler={this.addHandler}
						changeView={this.changeView}
					/>
		} else if(view === 'edit') {
			return <Edit
						allCategories={allCategories}
						id={id}
						changeView={this.changeView}
					/>
		} else if(view === 'delete') {
			return <Delete
						deleteTerm={this.deleteTerm}
						changeView={this.changeView}
					/>
		} else {
			return <div className="loading"><img src="images/preloader.gif" /></div>
		}
	}
}




render(
	<App />,
	document.getElementById('app')
);