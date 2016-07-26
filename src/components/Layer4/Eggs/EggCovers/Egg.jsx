import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { videosUri } from 'tion2/utils/tools';
import css from './css';

const eggsVideosUri = `${videosUri}/eggs`;

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidUpdate() {
		if (this.props.eggs.selectedEggId === this.props.egg._id &&
		this.props.map.level === 'origin' && !this.props.map.animating) {
			this.refs.video.play();
		} else {
			this.refs.video.pause();
		}
	}
	render() {
		const isVisible = this.props.eggs.selectedEggId === this.props.egg._id &&
			this.props.map.level === 'origin' && !this.props.map.animating;
		const thisClass = classnames(css.egg, {
			[css.visible]: isVisible,
		});
		const videoUri = !this.props.egg.video ? '' : `${eggsVideosUri}/${this.props.egg.video}`;
		return (
			<div
				ref="egg"
				className={thisClass}
			>
				<video
					ref="video"
					mute
					poster="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/polina.jpg"
					id="bgvid"
					loop
				>
					<source
						src={videoUri}
						type="video/mp4"
					/>
				</video>
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
