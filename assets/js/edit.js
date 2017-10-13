import React, {Component} from 'react';
import Settings from './settings';

export default class Edit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			category: null,
			term: null,
			definition: null,
			error: null
		}
		this.getItem = this.getItem.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
		this.editTerm = this.editTerm.bind(this);
	}
	componentDidMount() {
		this.getItem();
	}
	getItem() {
		let options = {
			lexicon: 'get_item',
			id: this.props.id
		};
		fetch(Settings.server, {
			method: 'POST',
			headers: {'Content-Type': 'text/plain'},
			body: JSON.stringify(options)
		})
		.then(response => response.json())
		.then(data => {
			this.setState({
				category: data[0].category,
				term: data[0].term,
				definition: data[0].definition
			});
		});
	}
	submitHandler(e) {
		e.preventDefault();
		if(this.category.value === 'Select category' && this.newCategory.value === '') {
			this.setState({error: 'Error: Choose category or add new one'});
		} else if(this.term.value === '' || this.definition.value === '') {
			this.setState({error: 'Error: Fill in "Term" and "Definition" fields'});
		} else {
			let category = this.category.value;
			if(this.newCategory.value !== '') {
				category = this.newCategory.value;
			}
			let term = this.term.value;
			let definition = this.definition.value
			this.editTerm(category, term, definition, this.props.id);
			this.props.changeView('game');
		}
	}
	editTerm(category, term, definition, id) {
		let options = {
			lexicon: 'edit_term',
			id: id,
			category: category,
			term: term,
			definition: definition
		};
		fetch(Settings.server, {
			method: 'POST',
			headers: {'Content-Type': 'text/plain'},
			body: JSON.stringify(options)
		})
		.then(response => response.text())
		.then(data => {
			console.log(data);
		});
	}
	render() {
		let {id, changeView, allCategories} = this.props;
		let {category, term, definition, error} = this.state;

		if(term) {
			let categoriesList = allCategories.map((item,i) => <option key={i}>{item}</option>);
			return (
				<div className="wrapper">
					<div className="back"><button onClick={e => changeView('game',e)}><svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"/></svg></button></div>
					<form onSubmit={e => this.submitHandler(e)}>
						{error && <div className="msg alert">{error}</div>}
						<div>
							<select ref={category => (this.category = category)} defaultValue={category}>
								<option>Select category</option>
								{categoriesList}
							</select>
							<input ref={newCategory => (this.newCategory = newCategory)} type="text" placeholder="or add new category" />
						</div>
						<div>
							<input ref={term => (this.term = term)} type="text" placeholder="term" defaultValue={term} />
						</div>
						<div>
							<textarea ref={definition => (this.definition = definition)} placeholder="definition" defaultValue={definition}></textarea>
						</div>
						<div className="centered">
							<input type="submit" value="Edit" />
						</div>
					</form>
				</div>
			);
		} else {
			return <div className="loading"><img src="images/preloader.gif" /></div>
		}
	}
}