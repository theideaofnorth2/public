import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Audio from './Audio';
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
import { imagesUri } from 'tion2/utils/tools';

const backgroundImageUri = `${imagesUri}/background.jpg`;

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
					<link
						rel="preload"
						href={backgroundImageUri}
					/>
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
				<Audio />
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

const mapStateToProps = state => Object.assign({
	app: state.app,
});

export default connect(mapStateToProps)(MyComponent);
