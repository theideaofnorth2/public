import React, { Component } from 'react';
import { connect } from 'react-redux';
import { soundsUri } from 'tion2/utils/tools';

export class MyComponent extends Component {
	componentDidMount() {
		this.audioRef.addEventListener('ended', this.onEnded);
	}
	componentDidUpdate(prevProps) {
		if (this.props.player.audioPlaying) {
			if (!prevProps.player.audioPlaying ||
				prevProps.player.interview !== this.props.player.interview
			) this.play();
		}
		if (prevProps.player.audioPlaying && !this.props.player.audioPlaying) this.pause();
		if (prevProps.player.audioTimeSets !== this.props.player.audioTimeSets) {
			this.setCurrentTime();
		}
		if (this.props.player.volume !== prevProps.player.volume) this.setVolume();
	}
	componentWillUnmount() {
		this.audioRef.removeEventListener('ended', this.onEnded);
	}
	setVolume = () => { this.audioRef.volume = this.props.player.volume; }
	play = () => {
		this.setCurrentTime();
		this.audioRef.play();
		this.setVolume();
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
		window.requestAnimationFrame(() => {
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
	onEnded = () => {
		this.props.dispatch({ type: 'AUDIO_END' });
	}
	render() {
		const src = !this.props.player.interview ? null :
			`${soundsUri}/${this.props.player.interview.sound}`;
		return (
			<audio
				ref={ref => { this.audioRef = ref; }}
				preload="metadata"
				src={src}
			/>
		);
	}
}

const mapStateToProps = state => ({ player: state.player });

export default connect(mapStateToProps)(MyComponent);
