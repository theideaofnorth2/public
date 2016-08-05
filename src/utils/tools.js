export const SuperPromise = () => {
	const superPromise = {};
	superPromise.promise = new Promise((resolve, reject) => {
		Object.assign(superPromise, { resolve, reject });
	});
	return superPromise;
};

export const isCapture = document.location.search.indexOf('capture') !== -1;

const productionDomain = 'theideaofnorth2.com';

export const apiUri = `http://${productionDomain}/api/`;

export const imagesUri = process.env.NODE_ENV === 'development'
	? '/assets/images'
	: `http://images.${productionDomain}`;
export const videosUri = process.env.NODE_ENV === 'development'
	? '/assets/videos'
	: `http://videos.${productionDomain}`;
export const soundsUri = process.env.NODE_ENV === 'development'
	? '/assets/sounds'
	: `http://sounds.${productionDomain}`;
