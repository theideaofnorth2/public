import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Howl } from 'howler';
import classnames from 'classnames';
import { baseUri } from 'tion2/utils/tools';
import css from './css';

const soundsUri = `${baseUri}/assets/sounds`;

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			soundSeek: 0,
			soundPlaying: true,
			soundLoaded: false,
		};
		this.onLoad = this.onLoad.bind(this);
		this.loadSoundAndPlay = this.loadSoundAndPlay.bind(this);
		this.animatePlayer = this.animatePlayer.bind(this);
		this.togglePlay = this.togglePlay.bind(this);
		this.getClickPosition = this.getClickPosition.bind(this);
		this.getSeek = this.getSeek.bind(this);
		this.setSeek = this.setSeek.bind(this);
		this.seekClick = this.seekClick.bind(this);
	}
	componentDidUpdate(prevProps) {
		if (prevProps.play && !this.props.play) {
			if (this.sound) this.sound.stop();
		}
		if (!prevProps.play && this.props.play) {
			if (!this.sound) this.loadSoundAndPlay();
			else {
				this.togglePlay();
			}
		}
	}
	onLoad() {
		this.setState({ soundLoaded: true });
		this.soundDuration = this.sound.duration();
		if (this.props.play) {
			this.togglePlay();
		}
	}
	getSeek() {
		this.setState({
			soundSeek: this.sound.seek(),
		});
	}
	setSeek(duration) {
		this.sound.seek(duration);
	}
	togglePlay() {
		if (this.sound.playing()) {
			this.setState({ soundPlaying: false });
			this.sound.pause();
		} else {
			this.setState({ soundPlaying: true });
			this.animatePlayer();
			this.sound.play();
		}
	}
	loadSoundAndPlay() {
		this.sound = new Howl({
			src: [`${soundsUri}/${this.props.interview.sound}`],
			html5: true,
			onload: this.onLoad,
		});
	}
	animatePlayer() {
		if (this.props.play) {
			window.requestAnimationFrame(this.animatePlayer);
			this.getSeek();
		}
	}
	getClickPosition(e) {
		const cx = e.clientX;
		const rect = this.refs.seekContainer.getBoundingClientRect();
		return (cx - rect.left) / rect.width;
	}
	seekClick(e) {
		this.setSeek(this.getClickPosition(e) * this.soundDuration);
	}
	render() {
		const thisClass = classnames(css.sound, {
			[css.visible]: this.props.play,
		});
		const buttonClass = classnames(css.button, {
			[css.playing]: this.state.soundPlaying,
		});
		const seekStyle = {
			width: `${this.state.soundSeek / this.soundDuration * 100}%`,
		};
		return (
			<div className={thisClass}>
				<div
					className={buttonClass}
					onClick={this.togglePlay}
				></div>
				<div
					ref="seekContainer"
					className={css.seekContainer}
					onClick={this.seekClick}
				>
					<div
						className={css.seek}
						style={seekStyle}
					>
					</div>
				</div>
				<div
					className={css.options}
				></div>
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MyComponent);
