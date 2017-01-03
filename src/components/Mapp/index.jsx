import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { delay } from 'redux-saga';
import OriginInterviewIcons from 'tion2/components/Mapp/OriginInterviewIcons';
import EggIcons from 'tion2/components/Mapp/EggIcons';
import Distances from 'tion2/components/Mapp/Distances';
import Origins from 'tion2/components/Mapp/Origins';
import Destinations from 'tion2/components/Mapp/Destinations';
import utilsCss from 'tion2/components/common/utils';
import appCss from 'tion2/components/App/css';
import canadaCoords from './data/canadaCoords';
import worldCoords from './data/worldCoords';
import mainStyles from './data/mainStyles.json';
import originStyles from './data/originStyles.json';
import {
	waitForMapIdle,
	setLayers,
	getMapOptionsFromUrl,
	areCentersEqual,
} from './utils';
import css from './css';

const polygonOptions = {
	strokeWeight: 0,
	fillColor: '#000000',
	fillOpacity: 0.8,
	paths: [worldCoords, canadaCoords],
};

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.setGmapOptions();
	}
	componentDidMount() {
		this.gmap = new google.maps.Map(this.mapRef, this.gmapOptions);
		this.props.dispatch({ type: 'MAP_INITIALIZED' });
	}
	componentDidUpdate(prevProps) {
		if (!prevProps.map.initialized && this.props.map.initialized) {
			this.gmap.addListener('dragstart', () => {
				this.props.dispatch({ type: 'MAP_DRAG_START' });
			});
			this.gmap.addListener('dragend', () => {
				setTimeout(() => { this.props.dispatch({ type: 'MAP_DRAG_END' }); }, 0);
			});
			this.setPolygonAndLayers();
		}
		if (!prevProps.map.centering && this.props.map.centering) {
			this.animateCenter();
		}
	}
	setPolygonAndLayers = () => {
		async function asyncFunc() {
			const polygon = new google.maps.Polygon(polygonOptions);
			polygon.setMap(this.gmap);
			await waitForMapIdle(this.gmap);
			setLayers(css.layer1, css.layer3);
			this.props.dispatch({ type: 'MAP_READY' });
			if (this.props.app.isCapture) this.setCaptureMapOptions.call(this);
		}
		asyncFunc.call(this);
	}
	setCaptureMapOptions = () => {
		this.gmapOptions = getMapOptionsFromUrl();
		this.gmap.panTo(this.gmapOptions.center);
		this.gmap.setOptions({ minZoom: undefined, maxZoom: undefined });
		this.gmap.setOptions({ zoom: 16 });
		setTimeout(() => {
			this.gmap.setOptions(this.gmapOptions);
		}, 0);
	}
	setGmapOptions = () => {
		this.gmapOptions = {
			backgroundColor: 'transparent',
			disableDefaultUI: true,
			zoom: this.props.map.zoom,
			minZoom: this.props.map.zoom,
			maxZoom: this.props.map.zoom,
			styles: this.props.map.styles === 'main' ? mainStyles : originStyles,
			center: this.props.map.center,
		};
	}
	setZoomAndStyles = () => {
		this.setGmapOptions();
		this.gmap.setOptions({ minZoom: undefined, maxZoom: undefined });
		this.gmap.setOptions(this.gmapOptions);
	}
	animateCenter = () => {
		async function asyncFunc() {
			await delay(0);
			if (!areCentersEqual(this.props.map.center, this.gmap.getCenter())) {
				this.gmap.panTo(this.props.map.center);
				await waitForMapIdle(this.gmap);
			}
			this.props.dispatch({ type: 'MAP_CENTER_FINISHED' });
			this.setZoomAndStyles();
		}
		asyncFunc.call(this);
	}
	render() {
		const mapClass = classnames(css.map, {
			[css.capture]: this.props.app.isCapture,
			[css.visible]: this.props.map.ready,
			[utilsCss.pointable]: this.props.exploration.mode === 'interactive',
		});
		return (
			<div
				className={appCss.mapp}
				hidden={this.props.map.zooming}
			>
				{!this.props.app.isCapture && (
					<div className={css.geoPositionedContent}>
						<Distances gmap={this.gmap} />
						<Destinations gmap={this.gmap} />
						<Origins gmap={this.gmap} />
						<OriginInterviewIcons gmap={this.gmap} />
						<EggIcons gmap={this.gmap} />
					</div>
				)}
				<div
					ref={ref => { this.mapRef = ref; }}
					className={mapClass}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	exploration: state.exploration,
	app: state.app,
	map: state.map,
});

export default connect(mapStateToProps)(MyComponent);
