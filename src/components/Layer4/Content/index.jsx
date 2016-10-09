import React, { Component } from 'react';
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
		const thisClass = classnames(css.content);
		return (
			<div className={thisClass}>
				<Approach />
				<About />
			</div>
		);
	}
}

export default MyComponent;
