export const SuperPromise = () => {
	const superPromise = {};
	superPromise.promise = new Promise((resolve, reject) => {
		Object.assign(superPromise, { resolve, reject });
	});
	return superPromise;
};

export const isCapture = document.location.search.indexOf('capture') !== -1;

export const baseUri = 'http://theideaofnorth2.com';

export const assetsUri = 	process.env.NODE_ENV === 'development' ?
	'' : 'http://theideaofnorth2.com';
