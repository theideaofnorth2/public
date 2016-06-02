import { Component } from 'react';
import { connect } from 'react-redux';
import { Howl } from 'howler';
import { baseUri } from 'tion2/utils/tools';

const soundsUri = `${baseUri}/assets/sounds`;

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.sounds = new Howl({
			src: [`${soundsUri}/${this.props.interview.sound}`],
			html5: true,
		});
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.interviews.playingInterview === this.props.interviews.playingInterview) return;
		if (nextProps.interviews.playingInterview !== this.props.interview._id) {
			this.sounds.stop();
		}
		if (nextProps.interviews.playingInterview === this.props.interview._id) {
			this.sounds.play();
		}
		return;
	}
	shouldComponentUpdate() {
		return false;
	}
	render() {
		return null;
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MyComponent);
