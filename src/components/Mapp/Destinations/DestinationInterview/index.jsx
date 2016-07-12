import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import circledArrow from './circled-arrow.svg';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
		this.onClick = this.onClick.bind(this);
		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
	}
	onClick() {
		if (!this.props.map.dragging) {
			this.props.dispatch({
				type: 'DESTINATION_INTERVIEW_CLICK',
				interviewId: this.props.interview._id,
				eggId: this.props.interview.eggId,
				originId: this.props.interview.originId,
			});
		}
	}
	onMouseEnter() {
		this.props.dispatch({
			type: 'DESTINATION_INTERVIEW_MOUSE_ENTER',
			interviewId: this.props.interview._id,
		});
	}
	onMouseLeave() {
		this.props.dispatch({
			type: 'DESTINATION_INTERVIEW_MOUSE_LEAVE',
			interviewId: this.props.interview._id,
		});
	}
	render() {
		const interviewClass = classnames(css.interview);
		return (
			<div
				className={interviewClass}
				onClick={this.onClick}
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
			>
				<div
					className={css.circledArrow}
					dangerouslySetInnerHTML={{ __html: circledArrow }}
				/>
				{this.props.interview.name}
			</div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	map: state.map,
});

export default connect(mapStateToProps)(MyComponent);
