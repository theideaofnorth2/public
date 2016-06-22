import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import interview from './interview.svg';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onClick = this.onClick.bind(this);
	}
	onClick() {
		this.props.dispatch({
			type: 'INTERVIEW_CLICK',
			interviewId: this.props.interview._id,
			originId: this.props.interview.originId,
		});
	}
	render() {
		const isVisible = this.props.eggs.selectedEggId === this.props.interview.eggId;
		const isPlaying = this.props.interviews.playingInterviewId === this.props.interview._id;
		const thisClass = classnames(
			css.interview, {
				[css.visible]: isVisible,
				[css.playing]: isPlaying,
			}
		);
		const thisStyle = {
			top: `${this.props.interview.top}%`,
			left: `${this.props.interview.left}%`,
		};
		return (
			<div
				ref="interview"
				className={thisClass}
				onClick={this.onClick}
				dangerouslySetInnerHTML={{ __html: interview }}
				style={thisStyle}
			>
			</div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	eggs: state.eggs,
	interviews: state.interviews,
	map: state.map,
});

export default connect(mapStateToProps)(MyComponent);
