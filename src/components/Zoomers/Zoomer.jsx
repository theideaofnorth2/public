import React, { Component } from 'react';
import { connect } from 'react-redux';
import Zoomer from 'zoomer';
import classnames from 'classnames';
import { assetsUri } from 'tion2/utils/tools';
import css from './css';

const originsImagesUri = `${assetsUri}/assets/images/origins`;

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.images = [0, 2, 4, 6, 8, 10].map(level => Object.assign({
			level,
			src: `${originsImagesUri}/${this.props.origin.key}/${level + 4}.png`,
		}));
		this.mountZoomer = this.mountZoomer.bind(this);
		this.animateZoomer = this.animateZoomer.bind(this);
	}
	componentDidMount() {
		this.mountZoomer();
	}
	componentDidUpdate() {
		if (
			this.props.zoomers.zooming &&
			this.props.origin._id === this.props.zoomers.origin
		) {
			this.animateZoomer();
		}
	}
	mountZoomer() {
		this.zoomer = new Zoomer({
			selector: `#zoomer_${this.props.origin.key}`,
			width: 1920,
			height: 1080,
			stepsPerLevel: 7,
			step: 0,
			opacityTransitionDuration: 0,
			images: this.images,
		});
		this.zoomer.on('ready', () => {
			this.setState({ mounted: true });
		});
	}
	animateZoomer() {
		const spl = 7;
		const fromStep = this.props.zoomers.direction === 'in' ? 0 : spl * 10;
		const toStep = this.props.zoomers.direction === 'in' ? spl * 10 : 0;
		this.zoomer.animateZoom({
			opacityTransitionDuration: 0,
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
				this.props.origin._id === this.props.zoomers.origin,
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

const mapStateToProps = (state) => Object.assign({
	zoomers: state.zoomers,
});

export default connect(mapStateToProps)(MyComponent);
