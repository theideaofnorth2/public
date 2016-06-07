import React, { Component } from 'react';
import { connect } from 'react-redux';
import Map from 'tion2/components/Map';
import Sounds from 'tion2/components/Sounds';
import Background from 'tion2/components/Background';
import Eggs from 'tion2/components/Eggs';
import EggInterviews from 'tion2/components/EggInterviews';
import Stories from 'tion2/components/Stories';
import Zoomers from 'tion2/components/Zoomers';
import Interface from 'tion2/components/Interface';
import { isCapture } from 'tion2/utils/tools';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	componentDidMount() {
	}
	render() {
		const content = isCapture ? (
			<div className={css.capture}>
				<Map capture />
			</div>
		) : (
			<div className={css.app}>
				<Background />
				<Map />
				<Zoomers />
				<Eggs />
				<EggInterviews />
				<Sounds />
				<Stories />
				<Interface />
			</div>
		);
		return content;
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MyComponent);
