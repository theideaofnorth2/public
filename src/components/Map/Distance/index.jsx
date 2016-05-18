import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Overlay from 'tion2/components/Map/Overlay';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const origin = this.props.interview.origin;
		const destination = this.props.interview.destination;
		const southWestLat = Math.min(origin.lat, destination.lat);
		const southWestLng = Math.min(origin.lng, destination.lng);
		const northEastLat = Math.max(origin.lat, destination.lat);
		const northEastLng = Math.max(origin.lng, destination.lng);
		const thisClass = classnames(
			css.distance, {
				[css.hover]: this.props.ui.interview_hover === this.props.interview._id,
			}
		);
		return (
			<Overlay
				gmap={this.props.gmap}
				southWestLat={southWestLat}
				southWestLng={southWestLng}
				northEastLat={northEastLat}
				northEastLng={northEastLng}
			>
				<div className={thisClass}>
					{this.props.interview.name}
				</div>
			</Overlay>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	ui: state.ui,
});

export default connect(mapStateToProps)(MyComponent);
