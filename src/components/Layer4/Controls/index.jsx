import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import TopBar from './TopBar';
import Tourer from './Tourer';
import Exit from './Exit';
import Menu from './Menu';
import Language from './Language';
import Exploration from './Exploration';
import Timeline from './Timeline';
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
			[css.hidden]: !this.props.controls.visible,
		});
		return (
			<div
				className={thisClass}
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
			>
				<Tourer />
				<Exit />
				<TopBar />
				<Menu />
				<Timeline />
				<Language />
				<Exploration />
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MyComponent);
