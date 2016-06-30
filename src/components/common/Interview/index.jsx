import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import interview from 'tion2/components/common/interview.svg';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.state = { selected: false };
		this.style = !this.props.interview.eggId ? {} : {
			top: `${this.props.interview.top}%`,
			left: `${this.props.interview.left}%`,
		};
		this.onClick = this.onClick.bind(this);
		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			visible:
				(nextProps.interview.parent === 'origin' &&
				nextProps.origins.selectedOriginId === nextProps.interview.originId) ||
				(nextProps.interview.parent === 'egg' &&
				nextProps.eggs.selectedEggId === nextProps.interview.eggId),
			selected: nextProps.interviews.selectedInterviewId === nextProps.interview._id,
		});
	}
	onClick() {
		if (this.state.selected) {
			return this.props.dispatch({ type: 'INTERVIEW_UNSELECTION_CLICK' });
		}
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
		const thisClass = classnames(
			css.interview, {
				[css.egg]: this.props.interview.eggId,
				[css.visible]: this.state.visible,
				[css.playing]: this.state.selected,
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
