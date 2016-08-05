import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import play from './play.svg';
import pause from './pause.svg';
import volume from './volume.svg';
import { Howl } from 'howler';
import { soundsUri } from 'tion2/utils/tools';
import css from './css';

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
		this.updateSeek = this.updateSeek.bind(this);
		this.play = this.play.bind(this);
		this.pause = this.pause.bind(this);
		this.togglePlay = this.togglePlay.bind(this);
		this.getClickPosition = this.getClickPosition.bind(this);
		this.setSeek = this.setSeek.bind(this);
	}
	componentDidUpdate(prevProps) {
		if (prevProps.play === this.props.play) return;
		if (!this.props.play) {
			if (this.sound) this.sound.stop();
		}
		if (this.props.play) {
			if (!this.sound) this.loadSoundAndPlay();
			else this.togglePlay();
		}
	}
	onLoad() {
		this.setState({ soundLoaded: true });
		this.soundDuration = this.sound.duration();
		if (this.props.play) this.togglePlay();
	}
	loadSoundAndPlay() {
		this.sound = new Howl({
			src: [`${soundsUri}/${this.props.interview.sound}`],
			preload: true,
			html5: true,
			onload: this.onLoad,
		});
	}
	play() {
		this.setState({ soundPlaying: true });
		this.updateSeek();
		this.sound.play();
	}
	pause() {
		this.setState({ soundPlaying: false });
		this.sound.pause();
	}
	togglePlay() {
		if (!this.sound.playing()) this.play();
		else this.pause();
	}
	updateSeek() {
		if (this.state.soundPlaying) window.requestAnimationFrame(this.updateSeek);
		this.setState({ soundSeek: this.sound.seek() });
	}
	getClickPosition(e) {
		const rect = this.refs.seekContainer.getBoundingClientRect();
		const cx = e.clientX;
		return (cx - rect.left) / rect.width;
	}
	setSeek(e) {
		const soundPosition = this.getClickPosition(e) * this.soundDuration;
		this.sound.seek(soundPosition);
		this.setState({ soundSeek: soundPosition });
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
				>
					<div
						className={css.play}
						dangerouslySetInnerHTML={{ __html: play }}
					></div>
					<div
						className={css.pause}
						dangerouslySetInnerHTML={{ __html: pause }}
					></div>
				</div>
				<div
					ref="seekContainer"
					className={css.seekContainer}
					onClick={this.setSeek}
				>
					<div
						className={css.seek}
						style={seekStyle}
					>
					</div>
				</div>
				<div
					className={css.volume}
					dangerouslySetInnerHTML={{ __html: volume }}
				></div>
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MyComponent);
