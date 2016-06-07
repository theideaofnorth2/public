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
				interview={interview}
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
	interviews: state.interviews.eggData,
});

export default connect(mapStateToProps)(MyComponent);
