import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sound from './Sound';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const content = this.props.interviews.data.map(interview => Object.assign(
			<Sound
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
	map: state.map,
	interviews: state.interviews,
});

export default connect(mapStateToProps)(MyComponent);
