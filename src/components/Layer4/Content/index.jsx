import React, { Component } from 'react';
import Approach from './Approach';
import About from './About';
import css from './css';

export class MyComponent extends Component {
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
