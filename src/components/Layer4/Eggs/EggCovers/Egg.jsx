import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.videoUri = `https://www.youtube.com/embed/${this.props.egg.video}?rel=0&controls=0&autoplay=1&modestbranding=1`;
	}
	render() {
		const isVisible = this.props.eggs.selectedEggId === this.props.egg._id &&
			this.props.map.level === 'origin' && !this.props.map.animating;
		const thisClass = classnames(css.egg, {
			[css.visible]: isVisible,
		});
		const videoUri = this.props.eggs.selectedEggId !== this.props.egg._id ||
			this.props.interviews.selectedInterviewId
			? ''
			: this.videoUri;
		return (
			<div
				ref="egg"
				className={thisClass}
			>
				<iframe
					src={videoUri}
					frameBorder="0"
					allowFullScreen
				></iframe>
				{this.props.egg.name}
			</div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	eggs: state.eggs,
	interviews: state.interviews,
	map: state.map,
});

export default connect(mapStateToProps)(MyComponent);
