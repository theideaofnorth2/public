import React, { Component } from 'react';
import { connect } from 'react-redux';
import Audio from './Audio';
import Controls from './Controls';
import EggInterviewIcons from './Eggs/EggInterviewIcons';
import EggInterviewCovers from './Eggs/EggInterviewCovers';
import Content from './Content';
import Zoomers from './Zoomers';
import Blocker from './Blocker';
import Introduction from './Introduction';
import Slideshow from './Slideshow';
import Video from './Video';
import appCss from 'tion2/components/App/css';
import { imagesUri } from 'tion2/utils/tools';

const introductionImageUri = `${imagesUri}/introduction.png`;

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		if (!this.props.app.configed) {
			return (
				<div className={appCss.layer4}>
					<Introduction />
					<link
						rel="preload"
						href={introductionImageUri}
					/>
				</div>
			);
		} else if (!this.props.app.zoomersLoaded) {
			return (
				<div className={appCss.layer4}>
					<Introduction />
					<Zoomers />
				</div>
			);
		}
		return (
			<div className={appCss.layer4}>
				<Introduction />
				<Zoomers />
				<Audio />
				<Video />
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

const mapStateToProps = state => ({ app: state.app });

export default connect(mapStateToProps)(MyComponent);
