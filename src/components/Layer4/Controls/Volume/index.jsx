import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Rcslider from 'rc-slider';
import utilsCss from 'tion2/components/common/utils';
import 'rc-slider/assets/index.css';
import speaker from './speaker.svg';
import css from './css';

export class MyComponent extends Component {
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
	render() {
		if (!this.props.player.egg && !this.props.player.interview) return null;
		const volumeClass = classnames(utilsCss.pointable, css.volume, {
			[css.volumeHovered]: this.props.player.volumeHovered,
		});
		return (
			<div
				className={volumeClass}
				onMouseEnter={this.onVolumeMouseEnter}
				onMouseLeave={this.onVolumeMouseLeave}
			>
				<div
					className={css.speaker}
					dangerouslySetInnerHTML={{ __html: speaker }}
				/>
				<div className={css.slider}>
					<Rcslider
						vertical
						defaultValue={this.props.player.volume * 100}
						onChange={this.onVolumeChange}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({ player: state.player });

export default connect(mapStateToProps)(MyComponent);
