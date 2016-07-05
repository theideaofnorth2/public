import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import interview from 'tion2/components/common/interview.svg';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.style = !this.props.interview.eggId ? {} : {
			top: `${this.props.interview.top}%`,
			left: `${this.props.interview.left}%`,
		};
		this.onClick = this.onClick.bind(this);
		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
	}
	onClick() {
		return this.props.dispatch({
			type: 'INTERVIEW_SELECTION_CLICK',
			interviewId: this.props.interview._id,
			originId: this.props.interview.originId,
			eggId: this.props.interview.eggId,
		});
	}
	onMouseEnter() {
		this.props.dispatch({
			type: 'INTERVIEW_MOUSE_ENTER',
			interviewId: this.props.interview._id,
		});
	}
	onMouseLeave() {
		this.props.dispatch({ type: 'INTERVIEW_MOUSE_LEAVE' });
	}
	render() {
		const visible = (this.props.interview.parent === 'origin' &&
			this.props.origins.selectedOriginId === this.props.interview.originId) ||
			(this.props.interview.parent === 'egg' &&
			this.props.eggs.selectedEggId === this.props.interview.eggId);
		const hovered = this.props.interviews.hoveredInterviewId === this.props.interview._id;
		const faded = !hovered && this.props.interviews.hoveredInterviewId !== null;
		const thisClass = classnames(
			css.interview, {
				[css.egg]: this.props.interview.eggId,
				[css.visible]: visible,
				[css.hovered]: hovered,
				[css.faded]: faded,
			}
		);
		return (
			<div
				ref="interview"
				className={thisClass}
				onClick={this.onClick}
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
				dangerouslySetInnerHTML={{ __html: interview }}
				style={this.style}
			>
			</div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	eggs: state.eggs,
	origins: state.origins,
	interviews: state.interviews,
	map: state.map,
});

export default connect(mapStateToProps)(MyComponent);
