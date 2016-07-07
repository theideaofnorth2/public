import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sounds from './Sounds';
import EggCovers from './EggCovers';
import EggInterviewIcons from './EggInterviewIcons';
import EggInterviewCovers from './EggInterviewCovers';
import Stories from './Stories';
import Zoomers from './Zoomers';
import Exit from './Exit';
import Interface from './Interface';
import Loader from './Loader';
import Menu from './Menu';
import Slideshow from './Slideshow';
import Home from './Home';
import appCss from 'tion2/components/App/css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		return !this.props.app.configed ? (<Loader />) : (
			<div className={appCss.layer4}>
				<Zoomers />
				<EggCovers />
				<EggInterviewCovers />
				<EggInterviewIcons />
				<Slideshow />
				<Sounds />
				<Exit />
				<Menu />
				<Stories />
				<Home />
				<Interface />
			</div>
		);
	}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(MyComponent);
