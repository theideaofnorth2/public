import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import contentCss from '../css';

export class MyComponent extends Component {
	renderTrackVertical = () => (
		<div className={contentCss.renderTrackVertical} />
	);
	renderThumbVertical = () => (
		<div className={contentCss.renderThumbVertical} />
	);
	render() {
		return (
			<Scrollbars
				renderTrackVertical={this.renderTrackVertical}
				renderThumbVertical={this.renderThumbVertical}
			>
				{this.props.children}
			</Scrollbars>
		);
	}
}

export default MyComponent;
