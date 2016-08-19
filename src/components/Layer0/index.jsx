import React, { Component } from 'react';
import Destinations from './Destinations';
import appCss from 'tion2/components/App/css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		return (
			<div className={appCss.layer0}>
				<Destinations />
			</div>
		);
	}
}

export default MyComponent;
