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
			prevProps.player.currentImageIndex !==
			this.props.player.currentImageIndex
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
		if (this.refs && this.refs.currentSlide) {
			this.refs.currentSlide.classList.remove(css.loaded);
			requestAnimationFrame(() => this.refs.currentSlide.classList.add(css.loaded));
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
		const imagesDir = `${interviewsImagesUri}/${this.props.interview.image}`;
		const prevImagePath = this.props.interview.images[this.props.player.prevImageIndex];
		const currentImagePath = this.props.interview.images[this.props.player.currentImageIndex];
		const nextImagePath = this.props.interview.images[this.props.player.nextImageIndex];
		const prevSlideStyle = { backgroundImage: `url(${imagesDir}/${prevImagePath})` };
		const currentSlideStyle = { backgroundImage: `url(${imagesDir}/${currentImagePath})` };
		const nextSlideStyle = { backgroundImage: `url(${imagesDir}/${nextImagePath})` };
		return (
			<div className={thisClass}>
				<div
					className={css.slide}
					style={prevSlideStyle}
				></div>
				<div
					ref="currentSlide"
					className={css.slide}
					style={currentSlideStyle}
				></div>
				<div
					className={css.slide}
					style={nextSlideStyle}
				></div>
			</div>
		);
	}
}

const mapStateToProps = state => Object.assign({
	player: state.player,
});

export default connect(mapStateToProps)(MyComponent);
