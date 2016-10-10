import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import play from './play.svg';
import pause from './pause.svg';
import utilsCss from 'tion2/components/common/utils';
import css from './css';

export class MyComponent extends Component {
	togglePlay = () => {
		this.props.dispatch({ type: 'INTERVIEW_AUDIO_PLAYING_TOGGLE' });
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
		});
		const buttonClass = classnames(css.button, {
			[css.playing]: this.props.player.audioPlaying,
		});
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
