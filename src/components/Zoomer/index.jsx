import React, { Component } from 'react';
import { connect } from 'react-redux';
import Zoomer from 'zoomer';
import classnames from 'classnames';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.mountZoomer = this.mountZoomer.bind(this);
		this.animateZoomer = this.animateZoomer.bind(this);
	}
	componentDidMount() {
		this.mountZoomer();
	}
	componentWillReceiveProps(nextProps) {
		if (!this.props.map.zooming && nextProps.map.zooming) {
			const direction = nextProps.map.selectedOrigin ? 'in' : 'out';
			this.animateZoomer(direction);
		}
	}
	mountZoomer() {
		this.zoomer = new Zoomer({
			selector: '#zoomerElement',
			width: 1920,
			height: 1080,
			stepsPerLevel: 7,
			step: 0,
			opacityTransitionDuration: 0,
			images: [{
				src: './images/churchill/4.png',
				level: 0,
			}, {
				src: './images/churchill/6.png',
				level: 2,
			}, {
				src: './images/churchill/8.png',
				level: 4,
			}, {
				src: './images/churchill/10.png',
				level: 6,
			}, {
				src: './images/churchill/12.png',
				level: 8,
			}, {
				src: './images/churchill/13.png',
				level: 9,
			}],
		});
		this.zoomer.on('ready', () => {
			this.setState({ mounted: true });
		});
	}
	animateZoomer(direction) {
		const spl = 7;
		const fromStep = direction === 'in' ? 0 : spl * 9;
		const toStep = direction === 'in' ? spl * 9 : 0;
		this.zoomer.animateZoom({
			opacityTransitionDuration: 0,
			stepsPerLevel: spl,
			fromStep,
			toStep,
		}).then(() => {
			this.props.dispatch({ type: 'MAP_ZOOMING_FINISHED' });
		});
	}
	render() {
		const thisClass = classnames(css.zoomerContainer, {
			[css.mounted]: this.state.mounted,
			[css.zooming]: this.props.map.zooming,
		});
		return (
			<div className={thisClass}>
				<div
					className={css.zoomer}
					id="zoomerElement"
				></div>
			</div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	map: state.map,
});

export default connect(mapStateToProps)(MyComponent);
