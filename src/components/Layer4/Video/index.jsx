import React, { Component } from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import css from './css';

const opts = {
	playerVars: {
		rel: 0,
		controls: 0,
		autoplay: 1,
		modestbranding: 1,
	},
};

export class Video extends Component {
	componentDidUpdate(prevProps) {
		if (this.props.player.volume !== prevProps.player.volume) { this.setVolume(); }
	}
	onReady = e => { this.player = e.target; }
	setVolume = () => this.player.setVolume(this.props.player.volume * 100);
	onPlay = () => this.setVolume();
	render() {
		if (!this.props.player.egg || this.props.player.interview) return null;
		return (
			<div className={css.video}>
				<YouTube
					videoId={this.props.player.egg.video}
					opts={opts}
					onReady={this.onReady}
					onPlay={this.onPlay}
					onStateChange={this.onStateChange}
				/>
				{this.props.player.egg.name}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({ player: state.player });

export default connect(mapStateToProps)(Video);
