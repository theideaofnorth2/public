import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sounds from './Sounds';
import Eggs from './Eggs';
import Interviews from './Interviews';
import Stories from './Stories';
import Zoomers from './Zoomers';
import Interface from './Interface';
import appCss from 'tion2/components/App/css';
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
			<div className={appCss.layer4}>
				<Zoomers />
				<Eggs />
				{interviewCoversContent}
				<Interviews />
				<Sounds />
				<Interface />
				<Stories />
			</div>
		);
	}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(MyComponent);
