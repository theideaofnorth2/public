import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sound from './Sound';
import utilsCss from 'tion2/components/common/utils';

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
				play={interview._id === this.props.interviews.selectedInterviewId}
			/>
		));
		return (
			<div className={utilsCss.pointable}>
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
