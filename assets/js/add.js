import React, {Component} from 'react';

export default class Add extends Component {
	render() {
		let {error, allCategories, addHandler, changeView } = this.props;
		let categoriesList = allCategories.map((item,i) => <option key={i}>{item}</option>);
		return (
			<div className="wrapper">
				<form onSubmit={e => addHandler(e, this)}>
					{error && <div className="msg alert">{error}</div>}
					<div>
						<select ref={category => (this.category = category)}>
							<option>Select category</option>
							{categoriesList}
						</select>
						<input ref={newCategory => (this.newCategory = newCategory)} type="text" placeholder="or add new category" />
					</div>
					<div>
						<input ref={term => (this.term = term)} type="text" placeholder="term" />
					</div>
					<div>
						<textarea ref={definition => (this.definition = definition)} placeholder="definition"></textarea>
					</div>
					<div className="centered">
						<input type="submit" value="Add" />
					</div>
				</form>
				<div className="back"><button onClick={e => changeView('game', e)}><svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"/></svg></button></div>
			</div>
		);
	}
}