import React, {Component} from 'react';
import Settings from './settings';
import Game from './game';
import Categories from './categories';

export default class Home extends Component {
	render() {
		return (
			<div className="wrapper">
				<Categories
					allCategories={this.props.allCategories}
					chosenCategory={this.props.chosenCategory}
					setCategory={this.props.setCategory}
				/>
				{this.props.chosenCategory && <Game
					chosenCategory={this.props.chosenCategory}
					changeView={this.props.changeView}
				/>}
				<div className="tools">
					<button onClick={e => this.props.changeView('add',e)}><svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/> </svg></button>
				</div>
			</div>
		);
	}
}
