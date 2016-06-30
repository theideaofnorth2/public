import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const isVisible = this.props.eggs.selectedEggId === this.props.egg._id &&
			this.props.map.level === 'origin' && !this.props.map.animating;
		const thisClass = classnames(css.egg, {
			[css.visible]: isVisible,
		});
		const videoUri = `https://player.vimeo.com/video/170188778?autoplay=${isVisible ? 1 : 0}&loop=1&title=0&byline=0&portrait=0`;
		return (
			<div
				ref="egg"
				className={thisClass}
			>
				<iframe
					src={videoUri}
					width="1920"
					height="1080"
					frameBorder="0"
					webkitallowfullscreen
					mozallowfullscreen
					allowFullScreen
				>
				</iframe>
				{this.props.egg.name}
			</div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	eggs: state.eggs,
	map: state.map,
});

export default connect(mapStateToProps)(MyComponent);
