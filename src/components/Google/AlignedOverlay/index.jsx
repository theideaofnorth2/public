import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import css from './css';
import Overlay from 'tion2/components/Google/Overlay';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
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
			>
				<div className={alignmentClass}>
					{this.props.children}
				</div>
			</Overlay>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MyComponent);
