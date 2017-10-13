import React, {Component} from 'react';
import Settings from './settings';

export default class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chosenCategory: this.props.chosenCategory,
			initialData: null,
			filteredData: null,
			definition: false,
			current: null,
			id: null
		}
		this.getData = this.getData.bind(this);
		this.definitionHandler = this.definitionHandler.bind(this);
		this.rememberHandler = this.rememberHandler.bind(this);
		this.resetHandler = this.resetHandler.bind(this);
		this.calcShowingItemIndex = this.calcShowingItemIndex.bind(this);
	}

	getData() {
		let options = {
			lexicon: 'get_data',
			category: this.state.chosenCategory
		};
		fetch(Settings.server, {
			method: 'POST',
			headers: {'Content-Type': 'text/plain'},
			body: JSON.stringify(options)
		})
		.then(response => response.json())
		.then(data => {
			let current = this.calcShowingItemIndex(data);
			let id = data[current].id;
			this.setState({
				initialData: data,
				filteredData: data,
				definition: false,
				current: current,
				id: id
			});
		});
	}

	componentDidMount() {
		this.getData();
	}

	componentDidUpdate(prevProps,prevState) {
		if(prevProps.chosenCategory !== this.props.chosenCategory) {
			this.setState({chosenCategory: this.props.chosenCategory});
		}
		if(prevState.chosenCategory !== this.state.chosenCategory) {
			this.getData();
		}
	}

	calcShowingItemIndex(itemsArray) {
		return itemsArray.length < 1 ? null : itemsArray.length > 1 ? Math.floor(Math.random() * itemsArray.length) : 0;
	}

	resetHandler() {
		let current = this.calcShowingItemIndex(this.state.initialData);
		let id = this.state.initialData[current].id;
		this.setState({
			filteredData: this.state.initialData,
			definition: false,
			current: current,
			id: id
		});
	}

	rememberHandler() {
		let newBornData = this.state.filteredData.filter((item,i) => i !== this.state.current);
		let current = this.calcShowingItemIndex(newBornData);
		let id = newBornData.length > 0 ? newBornData[current].id : null;
		this.setState({
			filteredData: newBornData,
			definition: false,
			current: current,
			id: id
		});
	}

	definitionHandler() {
		this.setState({definition: true});
	}


	render() {
		let {filteredData, definition, current, id} = this.state;

		if(filteredData !== null) {
			if(current !== null) {
				let left = filteredData.length - 1;
				left = left === 0 ? 'last one' : left + ' left';
				return (
					<div>
						<div className="term">{filteredData[current].term}</div>
						{
							definition
							&&
							<div className="definition">
								<p>{filteredData[current].definition}</p>
								<div className="buttons">
									<button onClick={this.rememberHandler}>Next</button>
								</div>
							</div>
						}
						{definition || <div className="buttons">
							<button className="alert" onClick={this.definitionHandler}>Forgot</button>
							<button className="success" onClick={this.rememberHandler}>Remember</button>
						</div>}
						<div className="tools2">
							<div className="left">{left}</div>
							{id && <button onClick={e => this.props.changeView('edit',e,id)} href="#"><svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg></button>}
							{id && <button onClick={e => this.props.changeView('delete',e,id)} href="#"><svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg></button>}
						</div>
					</div>
				);
			} else {
				return (
					<div className="centered">
						<p className="note">All items were shown</p>
						<div className="buttons">
							<button onClick={this.resetHandler}>Again</button>
						</div>
					</div>
				);
			}
		} else {
			return <div className="loading"><img src="images/preloader.gif" /></div>
		}
	}
}
