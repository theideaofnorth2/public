import React, { Component } from 'react';
import appCss from 'tion2/components/App/css';
import Destinations from './Destinations';

export class MyComponent extends Component {
	render() {
		return (
			<div className={appCss.layer0}>
				<Destinations />
			</div>
		);
	}
}

export default MyComponent;
