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
		this.imagesDir = `${interviewsImagesUri}/${this.props.interview.image}`;
	}
	componentDidMount() {
		this.preloadColorImage();
	}
	preloadColorImage = () => {
		if (this.props.interview.images[1]) {
			const colorImage = new Image();
			colorImage.src = `${this.imagesDir}/${this.props.interview.images[1]}`;
		}
	}
	render() {
		const thisStyle = !this.props.interview.image ? {} : {
			backgroundImage: `url(${this.imagesDir}/${this.props.interview.images[0]})`,
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
