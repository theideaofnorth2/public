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
	}
	render() {
		const content = isCapture ? (
			<div className={css.capture}>
				<Mapp capture />
			</div>
		) : (
			<div className={css.app}>
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
