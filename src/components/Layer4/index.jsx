import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
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
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const thisClass = classnames(appCss.layer4, css.layer4);
		return !this.props.app.configed ? (<Loader />) : (
			<div className={thisClass}>
				<Zoomers />
				<EggCovers />
				<EggInterviewCovers />
				<EggInterviewIcons />
				<Slideshow />
				<Sounds />
				<Exit />
				<div className={css.topBar} />
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
