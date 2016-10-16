import React, { Component } from 'react';
import { connect } from 'react-redux';
import InterviewIcon from 'tion2/components/common/InterviewIcon';
import utilsCss from 'tion2/components/common/utils';

export class MyComponent extends Component {
	render() {
		const content = this.props.interviews.eggData
			.map(interview => Object.assign(
				<InterviewIcon
					key={interview._id}
					interview={interview}
				/>
			));
		return (
			<div
				className={utilsCss.pointable}
				hidden={this.props.map.zooming}
			>
				{content}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	interviews: state.interviews,
	map: state.map,
});

export default connect(mapStateToProps)(MyComponent);
