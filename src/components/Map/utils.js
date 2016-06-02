import { SuperPromise } from 'tion2/utils/tools';
import mainStyles from './data/mainStyles.json';

const getMapOptionsFromUrl = () => {
	const params = new URLSearchParams(window.location);
	return {
		disableDefaultUI: true,
		zoom: parseInt(params.get('zoom'), 10),
		minZoom: parseInt(params.get('zoom'), 10),
		maxZoom: parseInt(params.get('zoom'), 10),
		center: {
			lat: parseFloat(params.get('lat')),
			lng: parseFloat(params.get('lng')),
		},
		styles: mainStyles,
	};
};

export const setMapCaptureOptions = (gmap) => {
	const captureMapOptions = getMapOptionsFromUrl();
	gmap.setOptions({ minZoom: undefined, maxZoom: undefined });
	gmap.setOptions(captureMapOptions);
};

export const waitForMapIdle = (map) => {
	const myPromise = new SuperPromise();
	google.maps.event.addListenerOnce(map, 'idle', () => {
		myPromise.resolve(map);
	});
	return myPromise.promise;
};

export const setLayers = (node, layer1Class, layer4Class) => {
	const gmContainer = node.querySelector('.gm-style > div:nth-child(1)');
	const layer1 = gmContainer.querySelector(':scope > div:nth-child(1)');
	const layer4 = gmContainer.querySelector(':scope > div:nth-child(4)');
	layer1.classList.add(layer1Class);
	layer4.classList.add(layer4Class);
};

export const areCentersEqual = (propsCenter, LatLng) => {
	const gmapCenter = {
		lat: LatLng.lat(),
		lng: LatLng.lng(),
	};
	return Math.abs(propsCenter.lat - gmapCenter.lat) < 0.0001 &&
		Math.abs(propsCenter.lng - gmapCenter.lng) < 0.0001;
};
