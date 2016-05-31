import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import canadaCoords from './data/canadaCoords';
import worldCoords from './data/worldCoords';
import mainStyles from './data/mainStyles.json';
import originStyles from './data/originStyles.json';
import Interviews from 'tion2/components/Map/Interviews';
import Distances from 'tion2/components/Map/Distances';
import Origins from 'tion2/components/Map/Origins';
import Destinations from 'tion2/components/Map/Destinations';
import { waitForMapIdle, setLayers, getGmapOptions, getMapOptionsFromUrl } from './utils';
import { isCapture } from 'tion2/utils/tools';
import css from './css';

const startGmapOptions = getGmapOptions({
	zoom: 4,
	styles: mainStyles,
	center: { lat: 62.536813, lng: -97.445291 },
});

const polygonOptions = {
	strokeWeight: 0,
	fillColor: '#000000',
	fillOpacity: 0.8,
	paths: [worldCoords, canadaCoords],
};

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.gmapOptions = startGmapOptions;
		this.animateMapOptions = this.animateMapOptions.bind(this);
		this.getOriginMapOptions = this.getOriginMapOptions.bind(this);
	}
	componentDidMount() {
		async function asyncFunc() {
			this.gmap = new google.maps.Map(this.refs.map, this.gmapOptions);
			this.props.dispatch({ type: 'MAP_INITIALIZED' });
			const polygon = new google.maps.Polygon(polygonOptions);
			polygon.setMap(this.gmap);
			await waitForMapIdle(this.gmap);
			setLayers(this.refs.map, css.layer1, css.layer4);
			this.props.dispatch({ type: 'MAP_READY' });
			if (isCapture) {
				const captureMapOptions = getMapOptionsFromUrl(this.props.cities);
				this.gmap.setOptions({ minZoom: undefined, maxZoom: undefined });
				this.gmap.setOptions(captureMapOptions);
			}
		}
		asyncFunc.call(this);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.map.selectedOrigin !== this.props.map.selectedOrigin) {
			this.animateMapOptions(nextProps);
		}
	}
	getOriginMapOptions(originId) {
		const origin = this.props.origins.data.find(c => c._id === originId);
		return getGmapOptions({
			zoom: 13,
			center: {
				lat: origin.lat,
				lng: origin.lng,
			},
			styles: originStyles,
		});
	}
	animateMapOptions(nextProps) {
		async function asyncFunc() {
			const nextGmapOptions = !nextProps.map.selectedOrigin ?
				startGmapOptions : this.getOriginMapOptions(nextProps.map.selectedOrigin);
			const center = !nextProps.map.selectedOrigin ?
				this.gmapOptions.center : nextGmapOptions.center;
			this.gmap.panTo(center);
			this.props.dispatch({ type: 'MAP_CENTERING_STARTED' });
			await waitForMapIdle(this.gmap);
			this.props.dispatch({ type: 'MAP_CENTERING_FINISHED' });
			this.gmap.setOptions({ minZoom: undefined, maxZoom: undefined });
			this.gmapOptions = Object.assign({}, nextGmapOptions);
			nextGmapOptions.center = undefined;
			this.gmap.setOptions(nextGmapOptions);
		}
		asyncFunc.call(this, nextProps);
	}
	render() {
		const content = !this.gmap ? null : (
			<div className={css.positionedContent}>
				<Distances gmap={this.gmap} />
				<Origins gmap={this.gmap} />
				<Destinations gmap={this.gmap} />
				<Interviews gmap={this.gmap} />
			</div>
		);
		const mapClass = classnames(css.map, {
			[css.capture]: isCapture,
			[css.ready]: this.props.map.ready,
			[css.zooming]: this.props.map.zooming,
		});
		return (
			<div>
				{content}
				<div ref="map" className={mapClass}></div>
			</div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	cities: state.cities,
	origins: state.origins,
	map: state.map,
});

export default connect(mapStateToProps)(MyComponent);
