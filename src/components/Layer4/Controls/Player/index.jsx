import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Rcslider from 'rc-slider';
import play from './play.svg';
import pause from './pause.svg';
import speaker from './speaker.svg';
import utilsCss from 'tion2/components/common/utils';
import 'rc-slider/assets/index.css';
import css from './css';

export class MyComponent extends Component {
	togglePlay = () => {
		this.props.dispatch({ type: 'INTERVIEW_AUDIO_PLAYING_TOGGLE' });
	}
	onVolumeMouseEnter = () => {
		this.props.dispatch({ type: 'PLAYER_VOLUME_MOUSE_ENTER' });
	}
	onVolumeMouseLeave = () => {
		this.props.dispatch({ type: 'PLAYER_VOLUME_MOUSE_LEAVE' });
	}
	onVolumeChange = value => {
		this.props.dispatch({
			type: 'PLAYER_VOLUME_CHANGE',
			volume: value / 100,
		});
	}
	getClickPosition = e => {
		const rect = this.refs.seekContainer.getBoundingClientRect();
		const cx = e.clientX;
		return (cx - rect.left) / rect.width;
	}
	setCurrentTime = e => {
		this.props.dispatch({
			type: 'INTERVIEW_AUDIO_TIME_SET',
			time: this.getClickPosition(e) * this.props.player.interview.duration,
		});
	}
	render() {
		if (!this.props.player.interview) return null;
		const thisClass = classnames(utilsCss.pointable, css.player, {
			[css.visible]: this.props.app.view === 'mapp' &&
				this.props.player.interview !== null,
			[css.volumeHovered]: this.props.player.volumeHovered,
		});
		const buttonClass = classnames(css.button, {
			[css.playing]: this.props.player.audioPlaying,
		});
		const volumeClass = classnames(css.volume);
		const seekStyle = !this.props.player.interview
			? {}
			: { transform: `scaleX(${this.props.player.audioTime /
				this.props.player.interview.duration})`,
		};
		const displayTime = `${parseInt(this.props.player.audioTime, 10)} / ` +
			`${this.props.player.interview.duration}`;
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
					className={volumeClass}
					onMouseEnter={this.onVolumeMouseEnter}
					onMouseLeave={this.onVolumeMouseLeave}
				>
					<div
						className={css.speaker}
						dangerouslySetInnerHTML={{ __html: speaker }}
					></div>
					<Rcslider
						className={css.slider}
						defaultValue={this.props.player.volume * 100}
						onChange={this.onVolumeChange}
					/>
				</div>
				<div
					ref="seekContainer"
					className={css.seekContainer}
					onClick={this.setCurrentTime}
				>
					<div
						className={css.seek}
						style={seekStyle}
					>
					</div>
				</div>
				<div
					className={css.time}
				>
					{displayTime}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => Object.assign({
	app: state.app,
	player: state.player,
});

export default connect(mapStateToProps)(MyComponent);
