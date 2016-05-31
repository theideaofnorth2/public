import { Component } from 'react';
import { connect } from 'react-redux';
import { Howl } from 'howler';

const soundsBaseUri = 'http://theideaofnorth2.com/assets/sounds/';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.sounds = new Howl({
			src: [`${soundsBaseUri}${this.props.interview.sound}`],
			html5: true,
		});
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.map.selectedInterview === this.props.map.selectedInterview) return;
		if (nextProps.map.selectedInterview !== this.props.interview._id) {
			this.sounds.stop();
		}
		if (nextProps.map.selectedInterview === this.props.interview._id) {
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
