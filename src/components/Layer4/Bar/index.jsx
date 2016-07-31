import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import TopBar from './TopBar';
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
	}
	render() {
		const thisClass = classnames(css.bar, {
			[css.hidden]: !this.props.app.mouseMoving,
		});
		return (
			<div className={thisClass}>
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
