export const SuperPromise = () => {
	const superPromise = {};
	superPromise.promise = new Promise((resolve, reject) => {
		Object.assign(superPromise, { resolve, reject });
	});
	return superPromise;
};

export const isCapture = document.location.search.indexOf('capture') !== -1;

const baseUri = 'http://theideaofnorth2.com';

export const apiUri = `${baseUri}/api/`;

const productionUri = document.URL.match(/cdn/) ?
	'http://assets.theideaofnorth2.com' : 'http://theideaofnorth2.com/assets';

export const assetsUri = process.env.NODE_ENV === 'development' ? '/assets' : productionUri;

export const imagesUri = `${assetsUri}/images`;
export const videosUri = `${assetsUri}/videos`;
export const soundsUri = `${assetsUri}/sounds`;
