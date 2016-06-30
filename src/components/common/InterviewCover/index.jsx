import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const thisStyle = {
			backgroundImage: `url(/assets/images/interviews/${this.props.interview.image})`,
		};
		const thisClass = classnames(css.interview, {
			[css.visible]: this.props.interviews.hoveredInterviewId === this.props.interview._id,
		});
		return (
			<div
				className={thisClass}
				style={thisStyle}
			/>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	interviews: state.interviews,
});

export default connect(mapStateToProps)(MyComponent);
