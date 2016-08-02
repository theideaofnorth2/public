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
		this.mouseStop = this.mouseStop.bind(this);
		this.clearMouseStopTimer = this.clearMouseStopTimer.bind(this);
		this.setMouseStopTimer = this.setMouseStopTimer.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		if (
			!this.props.app.interfaceDissmissable &&
			nextProps.app.interfaceDissmissable
		) {
			this.setMouseStopTimer();
		} else if (
			this.props.app.interfaceDissmissable &&
			!nextProps.app.interfaceDissmissable
		) this.clearMouseStopTimer();
	}
	onMouseMove() {
		if (this.props.app.interfaceDissmissed) {
			this.props.dispatch({ type: 'MOUSE_MOVE_NOT_ON_INTERFACE' });
		}
		if (this.props.app.interfaceDissmissable) this.setMouseStopTimer();
	}
	mouseStop() {
		this.props.dispatch({ type: 'MOUSE_STOP_FOR_5_SECONDS_NOT_ON_INTERFACE' });
	}
	clearMouseStopTimer() {
		clearTimeout(this.mouseStopTimer);
	}
	setMouseStopTimer() {
		clearTimeout(this.mouseStopTimer);
		this.mouseStopTimer = setTimeout(this.mouseStop, 5000);
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
