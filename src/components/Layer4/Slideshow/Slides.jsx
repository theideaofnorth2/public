import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { imagesUri } from 'tion2/utils/tools';
import utilsCss from 'tion2/components/common/utils';
import css from './css';

const interviewsImagesUri = `${imagesUri}/interviews`;

export class MyComponent extends Component {
	render() {
		if (
			!this.props.player.interview ||
			!this.props.player.interview.image ||
			!this.props.player.interview.images
		) return null;
		const imagesDir = `${interviewsImagesUri}/${this.props.player.interview.image}`;
		const slidesContent = this.props.player.interview.images.map((image, index) => {
			const slideStyle = { backgroundImage: `url(${imagesDir}/${image})` };
			const slideClass = classnames(utilsCss.pointable, css.slide, {
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
			<div>
				{slidesContent}
			</div>
		);
	}
}

const mapStateToProps = state => Object.assign({
	player: state.player,
});

export default connect(mapStateToProps)(MyComponent);
