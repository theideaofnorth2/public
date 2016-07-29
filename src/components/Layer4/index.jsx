import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import TopBar from './Bar/TopBar';
import Menu from './Bar/Menu';
import Language from './Bar/Language';
import Exploration from './Bar/Exploration';
import Timeline from './Bar/Timeline';
import EggCovers from './Eggs/EggCovers';
import EggInterviewIcons from './Eggs/EggInterviewIcons';
import EggInterviewCovers from './Eggs/EggInterviewCovers';
import Sounds from './Sounds';
import Zoomers from './Zoomers';
import Exit from './Exit';
import Interface from './Interface';
import Loader from './Loader';
import Tourer from './Tourer';
import Slideshow from './Slideshow';
import appCss from 'tion2/components/App/css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const thisClass = classnames(appCss.layer4);
		return !this.props.app.configed ? (<Loader />) : (
			<div className={thisClass}>
				<Zoomers />
				<EggCovers />
				<EggInterviewCovers />
				<EggInterviewIcons />
				<Slideshow />
				<Tourer />
				<Sounds />
				<Exit />
				<TopBar />
				<Menu />
				<Timeline />
				<Language />
				<Exploration />
				<Interface />
			</div>
		);
	}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(MyComponent);
