import React, { Component } from 'react';
import { connect } from 'react-redux';
import InterviewCover from 'tion2/components/common/InterviewCover';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const interviewCoversContent = this.props.interviews.eggData
			.map(interview => Object.assign(
				<InterviewCover
					key={interview._id}
					interview={interview}
				/>
			));
		return (
			<div>
				{interviewCoversContent}
			</div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	interviews: state.interviews,
});

export default connect(mapStateToProps)(MyComponent);
