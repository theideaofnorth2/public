import { SuperPromise } from 'tion2/utils/tools';
import mainStyles from './data/mainStyles.json';

export const getGmapOptions = (options) => Object.assign({}, {
	disableDefaultUI: true,
	zoom: parseInt(options.zoom, 10),
	minZoom: parseInt(options.zoom, 10),
	maxZoom: parseInt(options.zoom, 10),
	center: options.center,
	styles: options.styles,
});

export const getMapOptionsFromUrl = (cities) => {
	const params = new URLSearchParams(window.location);
	const { lat, lng } = [...cities.data.values()].filter(citie =>
		citie.key === params.get('citie')
	)[0];
	return getGmapOptions({
		zoom: params.get('zoom'),
		center: { lat, lng },
		styles: mainStyles,
	});
};

export const waitForMapIdle = (map) => {
	const myPromise = new SuperPromise();
	google.maps.event.addListenerOnce(map, 'idle', () => {
		setTimeout(() => {
			myPromise.resolve(map);
		}, 150);
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
