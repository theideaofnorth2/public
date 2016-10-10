import React, { Component } from 'react';
import Approach from './Approach';
import About from './About';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		return (
			<div className={css.content}>
				<Approach />
				<About />
			</div>
		);
	}
}

export default MyComponent;
