import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
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
		this.props.dispatch({
			type: 'DESTINATIONER_CLICK',
			citie: this.props.interview.origin,
			interview: this.props.interview._id,
		});
	}
	onMouseEnter() {
		this.props.dispatch({ type: 'DESTINATIONER_MOUSE_ENTER', interview: this.props.interview._id });
	}
	onMouseLeave() {
		this.props.dispatch({ type: 'DESTINATIONER_MOUSE_LEAVE', interview: this.props.interview._id });
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
				{this.props.interview.name}
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MyComponent);
