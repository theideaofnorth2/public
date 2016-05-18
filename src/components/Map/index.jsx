import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import css from './css';
import { delay } from 'redux-saga';
import { mapOptions, polygonOptions } from 'tion2/data/settings';
import Distances from './Distances';
import Cities from './Cities';
import { waitForMapIdle } from './utils';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	componentDidMount() {
		async function onMount() {
			this.gmap = new google.maps.Map(this.refs.map, mapOptions);
			this.props.dispatch({ type: 'MAP_INITIALIZED' });
			const polygon = new google.maps.Polygon(polygonOptions);
			polygon.setMap(this.gmap);
			await waitForMapIdle(this.gmap);
			this.setLayers.call(this);
			await delay(100);
			this.props.dispatch({ type: 'MAP_READY' });
		}
		onMount.call(this);
	}
	setLayers() {
		const gmContainer = this.refs.map.querySelector('.gm-style > div:nth-child(1)');
		const layer1 = gmContainer.querySelector(':scope > div:nth-child(1)');
		const layer4 = gmContainer.querySelector(':scope > div:nth-child(4)');
		layer1.classList.add(css.layer1);
		layer4.classList.add(css.layer4);
	}
	render() {
		const mapClass = classnames(css.map, {
			[css.initialized]: this.props.initialized,
			[css.ready]: this.props.ready,
		});
		const content = !this.gmap ? null : (
			<div>
				<Distances gmap={this.gmap} />
				<Cities gmap={this.gmap} />
			</div>
		);
		return (
			<div>
				<div ref="map" className={mapClass}></div>
				{content}
			</div>
		);
	}
}

const mapStateToProps = (state) => state.map;

export default connect(mapStateToProps)(MyComponent);
