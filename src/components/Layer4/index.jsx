import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Controls from './Controls';
import EggCovers from './Eggs/EggCovers';
import EggInterviewIcons from './Eggs/EggInterviewIcons';
import EggInterviewCovers from './Eggs/EggInterviewCovers';
import Content from './Content';
import Zoomers from './Zoomers';
import Blocker from './Blocker';
import Loader from './Loader';
import Slideshow from './Slideshow';
import appCss from 'tion2/components/App/css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const thisClass = classnames(appCss.layer4);
		if (!this.props.app.configed) {
			return (
				<div className={thisClass}>
					<Loader />
				</div>
			);
		} else if (!this.props.app.zoomersLoaded) {
			return (
				<div className={thisClass}>
					<Zoomers />
					<Loader />
				</div>
			);
		}
		return (
			<div className={thisClass}>
				<Zoomers />
				<EggCovers />
				<EggInterviewCovers />
				<EggInterviewIcons />
				<Slideshow />
				<Content />
				<Controls />
				<Blocker />
			</div>
		);
	}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(MyComponent);
