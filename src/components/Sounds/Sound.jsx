import { Component } from 'react';
import { connect } from 'react-redux';
import { Howl } from 'howler';
import { baseUri } from 'tion2/utils/tools';

const soundsUri = `${baseUri}/assets/sounds`;

export class MyComponent extends Component {
	componentDidUpdate(prevProps) {
		if (prevProps.interviews.playingInterview === this.props.interviews.playingInterview) return;
		if (this.props.interview._id !== this.props.interviews.playingInterview) {
			if (this.sound) this.sound.stop();
		}
		if (this.props.interview._id === this.props.interviews.playingInterview) {
			if (!this.sound) this.loadSound();
			this.sound.play();
		}
	}
	loadSound() {
		this.sound = new Howl({
			src: [`${soundsUri}/${this.props.interview.sound}`],
			html5: true,
		});
	}
	render() {
		return null;
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MyComponent);
