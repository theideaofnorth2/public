import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { imagesUri } from 'tion2/utils/tools';
import css from './css';

const interviewsImagesUri = `${imagesUri}/interviews`;

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const thisStyle = !this.props.interview.image ? {} : {
			backgroundImage: `url(${interviewsImagesUri}/${this.props.interview.image}/cover.jpg)`,
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
