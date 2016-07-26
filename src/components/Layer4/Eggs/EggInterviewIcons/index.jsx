import React, { Component } from 'react';
import { connect } from 'react-redux';
import InterviewIcon from 'tion2/components/common/InterviewIcon';
import layer4Css from '../../css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const content = this.props.interviews.eggData
			.map(interview => Object.assign(
				<InterviewIcon
					key={interview._id}
					interview={interview}
				/>
			));
		return (
			<div className={layer4Css.pointable}>
				{content}
			</div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	interviews: state.interviews,
});

export default connect(mapStateToProps)(MyComponent);
