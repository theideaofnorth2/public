import React, { Component } from 'react';
import { connect } from 'react-redux';
import Destination from './Destination';
import { getDestinations } from 'tion2/reducers/selectors/cities';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const content = this.props.destinations.map(destination => Object.assign(
			<Destination
				key={destination.name}
				gmap={this.props.gmap}
				destination={destination}
			/>
		));
		return (
			<div>
				{content}
			</div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	destinations: getDestinations(state),
});

export default connect(mapStateToProps)(MyComponent);
