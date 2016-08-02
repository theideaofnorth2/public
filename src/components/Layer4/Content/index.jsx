import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Approach from './Approach';
import About from './About';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const thisClass = classnames(css.contentContainer);
		return (
			<div className={thisClass}>
				<Approach />
				<About />
			</div>
		);
	}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(MyComponent);
