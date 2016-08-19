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
		this.imagesDir = `${interviewsImagesUri}/${this.props.interview.image}`;
		this.loadFirstImages = this.loadFirstImages.bind(this);
		this.nextImage = this.nextImage.bind(this);
		this.onImageUpdate = this.onImageUpdate.bind(this);
	}
	componentDidMount() {
		this.loadFirstImages();
		console.log('mounting ', this.props.interview);
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
	loadFirstImages() {
		if (this.props.interview.images[0]) {
			const firstImage = new Image();
			firstImage.src = `${this.imagesDir}/${this.props.interview.images[0]}`;
		}
		if (this.props.interview.images[1]) {
			const secondImage = new Image();
			secondImage.src = `${this.imagesDir}/${this.props.interview.images[1]}`;
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
		const slidesContent =
			this.props.interview.images.map((image, index) => {
				const slideStyle = { backgroundImage: `url(${this.imagesDir}/${image})` };
				const slideClass = classnames(css.slide, {
					[css.prevSlide]: this.props.player.prevImageIndex === index,
					[css.currentSlide]: this.props.player.currentImageIndex === index,
				});
				return (
					<div
						key={index}
						style={slideStyle}
						className={slideClass}
					></div>
				);
			});
		return (
			<div className={css.slider}>
				{slidesContent}
			</div>
		);
	}
}

const mapStateToProps = state => Object.assign({
	player: state.player,
});

export default connect(mapStateToProps)(MyComponent);
