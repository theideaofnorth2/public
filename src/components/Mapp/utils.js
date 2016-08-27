import { SuperPromise } from 'tion2/utils/tools';
import mainStyles from './data/mainStyles.json';

export const getMapOptionsFromUrl = () => {
	const params = new URLSearchParams(window.location);
	const zoom = parseInt(params.get('zoom'), 10);
	return {
		disableDefaultUI: true,
		zoom,
		minZoom: zoom,
		maxZoom: zoom,
		center: {
			lat: parseFloat(params.get('lat')),
			lng: parseFloat(params.get('lng')),
		},
		styles: mainStyles,
	};
};

export const waitForMapIdle = (map) => {
	const myPromise = new SuperPromise();
	google.maps.event.addListenerOnce(map, 'idle', () => {
		myPromise.resolve(map);
	});
	return myPromise.promise;
};

export const getGmContainer = () => document.querySelector('.gm-style > div:nth-child(1)');

export const setLayers = (layer1Class, layer3Class) => {
	const layer1 = document.querySelector('.gm-style > div:nth-child(1) > div:nth-child(1)');
	const layer3 = document.querySelector('.gm-style > div:nth-child(1) > div:nth-child(4)');
	layer1.classList.add(layer1Class);
	layer3.classList.add(layer3Class);
};

export const areCentersEqual = (propsCenter, LatLng) => {
	const gmapCenter = {
		lat: LatLng.lat(),
		lng: LatLng.lng(),
	};
	return Math.abs(propsCenter.lat - gmapCenter.lat) < 0.0001 &&
		Math.abs(propsCenter.lng - gmapCenter.lng) < 0.0001;
};
