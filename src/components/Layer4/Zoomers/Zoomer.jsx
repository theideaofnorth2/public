import React, { Component } from 'react';
import { connect } from 'react-redux';
import Zoomer from 'zoomer';
import classnames from 'classnames';
import { imagesUri } from 'tion2/utils/tools';
import css from './css';

const originsImagesUri = `${imagesUri}/origins`;

export class MyComponent extends Component {
	state = {}
	constructor(props) {
		super(props);
		this.lastLevel = this.props.origin.zoom;
		this.images = [4, 6, 8, 10, 12, this.lastLevel].map(level => ({
			level,
			src: `${originsImagesUri}/${this.props.origin.key}/${level}.png`,
		}));
	}
	componentDidMount() {
		this.mountZoomer();
	}
	componentDidUpdate() {
		if (
			this.props.zoomers.zooming &&
			this.props.origin._id === this.props.zoomers.originId
		) {
			this.animateZoomer();
		}
	}
	mountZoomer = () => {
		this.zoomer = new Zoomer({
			selector: `#zoomer_${this.props.origin.key}`,
			width: 1920,
			height: 1080,
			stepsPerLevel: 6,
			step: 24,
			images: this.images,
		});
		this.zoomer.on('ready', () => {
			this.setState({ mounted: true });
			this.props.onMount(this.props.origin.key);
		});
	}
	animateZoomer = () => {
		const spl = 6;
		const fromStep = this.props.zoomers.direction === 'in' ? spl * 4 : spl * this.lastLevel;
		const toStep = this.props.zoomers.direction === 'in' ? spl * this.lastLevel : spl * 4;
		this.zoomer.animateZoom({
			stepsPerLevel: spl,
			fromStep,
			toStep,
		}).then(() => {
			this.props.dispatch({ type: 'MAP_ZOOM_FINISHED' });
		});
	}
	render() {
		const thisClass = classnames(css.zoomerContainer, {
			[css.mounted]: this.state.mounted,
			[css.zooming]: this.props.zoomers.zooming &&
				this.props.origin._id === this.props.zoomers.originId,
		});
		return (
			<div className={thisClass}>
				<div
					className={css.zoomer}
					id={`zoomer_${this.props.origin.key}`}
				></div>
			</div>
		);
	}
}

const mapStateToProps = state => ({ zoomers: state.zoomers });

export default connect(mapStateToProps)(MyComponent);
