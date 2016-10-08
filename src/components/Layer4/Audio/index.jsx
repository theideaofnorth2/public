import React, { Component } from 'react';
import { connect } from 'react-redux';
import { soundsUri } from 'tion2/utils/tools';

export class MyComponent extends Component {
	componentDidUpdate(prevProps) {
		if (!this.props.player.interview) return;
		if (!prevProps.player.audioPlaying && this.props.player.audioPlaying) this.play();
		if (prevProps.player.audioPlaying && !this.props.player.audioPlaying) this.pause();
		if (prevProps.player.audioTimeSets !== this.props.player.audioTimeSets) {
			this.setCurrentTime();
		}
		if (this.props.player.volume !== prevProps.player.volume) {
			this.audioRef.volume = this.props.player.volume;
		}
	}
	play = () => {
		this.setCurrentTime();
		this.audioRef.play();
		this.getCurrentTime();
	}
	pause = () => {
		this.audioRef.pause();
		this.setCurrentTime();
	}
	getCurrentTime = () => {
		if (!this.props.player.audioPlaying) return;
		clearTimeout(this.timeout);
		this.timeout = setTimeout(this.getCurrentTime, 1000);
		requestAnimationFrame(() => {
			if (!this.props.player.audioPlaying) return;
			this.props.dispatch({
				type: 'INTERVIEW_AUDIO_TIME_GET',
				time: this.audioRef.currentTime,
			});
		});
	}
	setCurrentTime = () => {
		this.audioRef.currentTime = this.props.player.audioTime;
	}
	render() {
		if (!this.props.player.interview) return null;
		return (
			<audio
				ref={ref => { this.audioRef = ref; }}
				preload="metadata"
				src={`${soundsUri}/${this.props.player.interview.sound}`}
			/>
		);
	}
}

const mapStateToProps = state => Object.assign({
	player: state.player,
});

export default connect(mapStateToProps)(MyComponent);
