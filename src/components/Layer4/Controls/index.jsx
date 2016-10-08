import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Tourer from './Tourer';
import Exit from './Exit';
import Player from './Player';
import Background from './Background';
import Timeline from './Timeline';
import Menu from './Menu';
import Language from './Language';
import Exploration from './Exploration';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
	}
	onMouseEnter() {
		this.props.dispatch({ type: 'CONTROLS_MOUSE_ENTER' });
	}
	onMouseLeave() {
		this.props.dispatch({ type: 'CONTROLS_MOUSE_LEAVE' });
	}
	render() {
		const thisClass = classnames(css.controls, {
			[css.hidden]: this.props.app.view === 'mapp' &&
				!this.props.controls.visible,
		});
		return (
			<div
				className={thisClass}
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
			>
				<Tourer />
				<Exit />
				<Player />
				<Background />
				<Menu />
				<Timeline />
				<Language />
				<Exploration />
			</div>
		);
	}
}

const mapStateToProps = state => Object.assign({
	app: state.app,
	controls: state.controls,
});

export default connect(mapStateToProps)(MyComponent);
