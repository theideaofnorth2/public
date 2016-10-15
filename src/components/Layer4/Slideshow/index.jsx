import React, { Component } from 'react';
import Slides from './Slides';
import Themes from './Themes';
import css from './css';

export class MyComponent extends Component {
	render() {
		return (
			<div className={css.slideshow}>
				<Slides />
				<Themes />
			</div>
		);
	}
}

export default MyComponent;
