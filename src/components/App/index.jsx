import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layer0 from 'tion2/components/Layer0';
import Layer2 from 'tion2/components/Layer2';
import Layer4 from 'tion2/components/Layer4';
import Mapp from 'tion2/components/Mapp';
import { isCapture } from 'tion2/utils/tools';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseStopFor5Seconds = this.onMouseStopFor5Seconds.bind(this);
		this.clearMouseStopTimer = this.clearMouseStopTimer.bind(this);
		this.setMouseStopTimer = this.setMouseStopTimer.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		if (
			this.props.controls.hovered &&
			!nextProps.controls.hovered
		) this.setMouseStopTimer();
		else if (
			!this.props.controls.hovered &&
			nextProps.controls.hovered
		) this.clearMouseStopTimer();
	}
	onMouseMove() {
		if (!this.props.controls.hovered) this.setMouseStopTimer();
		if (!this.props.controls.visible) this.props.dispatch({ type: 'CONTROLS_SHOW' });
	}
	onMouseStopFor5Seconds() {
		this.props.dispatch({ type: 'CONTROLS_HIDE' });
	}
	clearMouseStopTimer() {
		clearTimeout(this.mouseStopTimer);
	}
	setMouseStopTimer() {
		this.clearMouseStopTimer();
		this.mouseStopTimer = setTimeout(this.onMouseStopFor5Seconds, 5000);
	}
	render() {
		const content = isCapture ? (
			<div className={css.capture}>
				<Mapp capture />
			</div>
		) : (
			<div
				className={css.app}
				onMouseMove={this.onMouseMove}
			>
				<Layer0 />
				<Layer2 />
				<Mapp />
				<Layer4 />
			</div>
		);
		return content;
	}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(MyComponent);
