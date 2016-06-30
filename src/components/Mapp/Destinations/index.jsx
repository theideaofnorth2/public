import React, { Component } from 'react';
import { connect } from 'react-redux';
import Destination from './Destination';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const content = this.props.destinations.data.map(destination => Object.assign(
			<Destination
				key={destination.name}
				gmap={this.props.gmap}
				destination={destination}
			/>
		));
		return !this.props.gmap ? null : (
			<div>
				{content}
			</div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	destinations: state.destinations,
});

export default connect(mapStateToProps)(MyComponent);
