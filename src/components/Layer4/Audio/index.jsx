import React, { Component } from 'react';
import { connect } from 'react-redux';
import { soundsUri } from 'tion2/utils/tools';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.play = this.play.bind(this);
		this.pause = this.pause.bind(this);
		this.getCurrentTime = this.getCurrentTime.bind(this);
		this.setCurrentTime = this.setCurrentTime.bind(this);
	}
	componentDidUpdate(prevProps) {
		if (!prevProps.interviews.audioPlaying && this.props.interviews.audioPlaying) this.play();
		if (prevProps.interviews.audioPlaying && !this.props.interviews.audioPlaying &&
			this.props.interviews.selectedInterviewId) this.pause();
		if (prevProps.interviews.audioTimeSets !== this.props.interviews.audioTimeSets) {
			this.setCurrentTime();
		}
	}
	play() {
		this.setCurrentTime();
		this.refs.audio.play();
		this.getCurrentTime();
	}
	pause() {
		this.refs.audio.pause();
		this.setCurrentTime();
	}
	getCurrentTime() {
		if (!this.props.interviews.audioPlaying) return;
		setTimeout(this.getCurrentTime, 1000);
		this.props.dispatch({
			type: 'INTERVIEW_AUDIO_TIME_GET',
			time: this.refs.audio.currentTime,
		});
	}
	setCurrentTime() {
		this.refs.audio.currentTime = this.props.interviews.audioTime;
	}
	render() {
		if (!this.props.interviews.selectedInterviewId) return null;
		return (
			<audio
				ref="audio"
				preload="metadata"
				src={`${soundsUri}/${this.props.interviews.selectedInterview.sound}`}
			/>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MyComponent);
