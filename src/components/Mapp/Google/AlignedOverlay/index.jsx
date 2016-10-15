import React, { Component } from 'react';
import classnames from 'classnames';
import css from './css';
import Overlay from 'tion2/components/Mapp/Google/Overlay';

export class MyComponent extends Component {
	render() {
		const alignmentClass = classnames(
			css.alignment,
			css[this.props.vertical],
			css[this.props.horizontal],
		);
		return (
			<Overlay
				gmap={this.props.gmap}
				southWestLat={this.props.lat}
				southWestLng={this.props.lng}
				northEastLat={this.props.lat}
				northEastLng={this.props.lng}
				zIndex={this.props.zIndex}
			>
				<div className={alignmentClass}>
					{this.props.children}
				</div>
			</Overlay>
		);
	}
}

export default MyComponent;
