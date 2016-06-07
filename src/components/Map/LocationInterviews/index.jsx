import React, { Component } from 'react';
import { connect } from 'react-redux';
import Interview from './Interview';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const content = this.props.interviews.map(interview => Object.assign(
			<Interview
				key={interview._id}
				gmap={this.props.gmap}
				interview={interview}
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
	interviews: state.interviews.locationData,
});

export default connect(mapStateToProps)(MyComponent);
