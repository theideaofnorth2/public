import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from './css';
import { TION2Overlay } from './utils';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	componentDidMount() {
		const bounds = new google.maps.LatLngBounds(
			new google.maps.LatLng(this.props.southWestLat, this.props.southWestLng),
			new google.maps.LatLng(this.props.northEastLat, this.props.northEastLng)
		);
		this.overlay = new TION2Overlay(bounds, this.refs.overlay, this.props.gmap);
		if (this.props.onMount) this.overlay.on('mount', this.props.onMount);
	}
	componentDidUpdate() {
	}
	render() {
		return (
			<div ref="overlay" className={css.overlay}>
				{this.props.children}
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MyComponent);
