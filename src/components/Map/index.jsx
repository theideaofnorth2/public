import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { delay } from 'redux-saga';
import canadaCoords from './data/canadaCoords';
import worldCoords from './data/worldCoords';
import mainStyles from './data/mainStyles.json';
import originStyles from './data/originStyles.json';
import LocationInterviews from 'tion2/components/Map/LocationInterviews';
import Eggs from 'tion2/components/Map/Eggs';
import Distances from 'tion2/components/Map/Distances';
import Origins from 'tion2/components/Map/Origins';
import Destinations from 'tion2/components/Map/Destinations';
import { waitForMapIdle, setLayers, setMapCaptureOptions, areCentersEqual } from './utils';
import { isCapture } from 'tion2/utils/tools';
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
		this.setPolygonAndLayers = this.setPolygonAndLayers.bind(this);
		this.animateCenter = this.animateCenter.bind(this);
		this.setZoomAndStyles = this.setZoomAndStyles.bind(this);
		this.setGmapOptions = this.setGmapOptions.bind(this);
		this.setGmapOptions();
	}
	componentDidMount() {
		this.gmap = new google.maps.Map(this.refs.map, this.gmapOptions);
		this.props.dispatch({ type: 'MAP_INITIALIZED' });
		this.setPolygonAndLayers();
		this.gmap.addListener('dragstart', () => {
			this.props.dispatch({ type: 'MAP_DRAG_START' });
		});
		this.gmap.addListener('dragend', () => {
			setTimeout(() => { this.props.dispatch({ type: 'MAP_DRAG_END' }); }, 0);
		});
	}
	componentDidUpdate(prevProps) {
		if (!prevProps.map.centering && this.props.map.centering) {
			this.animateCenter();
		}
	}
	setPolygonAndLayers() {
		async function asyncFunc() {
			const polygon = new google.maps.Polygon(polygonOptions);
			polygon.setMap(this.gmap);
			await waitForMapIdle(this.gmap);
			setLayers(this.refs.map, css.layer1, css.layer4);
			this.props.dispatch({ type: 'MAP_READY' });
			if (isCapture) setMapCaptureOptions(this.gmap);
		}
		asyncFunc.call(this);
	}
	setGmapOptions() {
		const zoom = this.props.map.level === 'main' ? 4 : 14;
		this.gmapOptions = {
			disableDefaultUI: true,
			zoom,
			minZoom: zoom,
			maxZoom: zoom,
			styles: this.props.map.styles === 'main' ? mainStyles : originStyles,
			center: this.props.map.center,
		};
	}
	setZoomAndStyles() {
		this.setGmapOptions();
		this.gmap.setOptions({ minZoom: undefined, maxZoom: undefined });
		this.gmap.setOptions(this.gmapOptions);
	}
	animateCenter() {
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
			[css.capture]: isCapture,
			[css.ready]: this.props.map.ready,
			[css.zooming]: this.props.map.zooming,
		});
		return (
			<div>
				<div className={css.positionedContent}>
					<Distances gmap={this.gmap} />
					<Origins gmap={this.gmap} />
					<Destinations gmap={this.gmap} />
					<LocationInterviews gmap={this.gmap} />
					<Eggs gmap={this.gmap} />
				</div>
				<div ref="map" className={mapClass}></div>
			</div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	origins: state.origins,
	map: state.map,
});

export default connect(mapStateToProps)(MyComponent);
