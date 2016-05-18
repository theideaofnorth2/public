import { SuperPromise } from 'tion2/utils/tools';

export const waitForMapIdle = (map) => {
	const myPromise = new SuperPromise();
	google.maps.event.addListenerOnce(map, 'idle', () => {
		myPromise.resolve(map);
	});
	return myPromise.promise;
};
