import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGmContainer } from 'tion2/components/Mapp/utils';
import InterviewCover from 'tion2/components/common/InterviewCover';
import appCss from 'tion2/components/App/css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	componentDidUpdate(prevProps) {
		if (!prevProps.map.ready && this.props.map.ready) {
			const gmContainer = getGmContainer();
			gmContainer.appendChild(this.refs.layer2);
		}
	}
	render() {
		const interviewCoversContent = this.props.interviews.originData
			.map(interview => Object.assign(
				<InterviewCover
					key={interview._id}
					interview={interview}
				/>
			));
		return !this.props.map.ready ? null : (
			<div
				ref="layer2"
				className={appCss.layer2}
			>
				{interviewCoversContent}
			</div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	map: state.map,
	interviews: state.interviews,
});

export default connect(mapStateToProps)(MyComponent);
