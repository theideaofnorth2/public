import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { imagesUri } from 'tion2/utils/tools';
import css from './css';

const interviewsImagesUri = `${imagesUri}/interviews`;
const SLIDE_DURATION = 15000;

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.state = { slideIndex: 0 };
		this.nextImage = this.nextImage.bind(this);
		this.onImageUpdate = this.onImageUpdate.bind(this);
	}
	componentDidUpdate(prevProps) {
		if (!prevProps.display && this.props.display) {
			setTimeout(this.nextImage, SLIDE_DURATION);
			this.onImageUpdate();
		}
		if (
			prevProps.interviews.slideshowFirstImageIndex !==
			this.props.interviews.slideshowFirstImageIndex
		) {
			this.onImageUpdate();
		}
	}
	nextImage() {
		if (this.props.display) {
			setTimeout(this.nextImage, SLIDE_DURATION);
			this.props.dispatch({
				type: 'NEXT_INTERVIEW_IMAGE',
				interviewId: this.props.interview._id,
			});
		}
	}
	onImageUpdate() {
		if (this.refs && this.refs.secondSlide) {
			this.refs.secondSlide.classList.remove(css.loaded);
			requestAnimationFrame(() => this.refs.secondSlide.classList.add(css.loaded));
		}
	}
	render() {
		if (
			!this.props.display ||
			!this.props.interview.image ||
			!this.props.interview.images
		) return null;
		const thisClass = classnames(css.slider, {
			[css.visible]: this.props.display,
		});
		const firstDivStyle = { backgroundImage:
			`url(${interviewsImagesUri}/${this.props.interview.image}/` +
			`${this.props.interview.images[this.props.interviews.slideshowFirstImageIndex]})`,
		};
		const secondDivStyle = { backgroundImage:
			`url(${interviewsImagesUri}/${this.props.interview.image}/` +
			`${this.props.interview.images[this.props.interviews.slideshowSecondImageIndex]})`,
		};
		const thirdImagePath = `${interviewsImagesUri}/${this.props.interview.image}/` +
			`${this.props.interview.images[this.props.interviews.slideshowThirdImageIndex]}`;
		return (
			<div className={thisClass}>
				<div
					className={css.slide}
					style={firstDivStyle}
				></div>
				<div
					ref="secondSlide"
					className={css.slide}
					style={secondDivStyle}
				></div>
				<link
					rel="preload"
					href={thirdImagePath}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MyComponent);
