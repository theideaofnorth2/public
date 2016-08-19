export const SuperPromise = () => {
	const superPromise = {};
	superPromise.promise = new Promise((resolve, reject) => {
		Object.assign(superPromise, { resolve, reject });
	});
	return superPromise;
};

export const pickInArray = (items) =>
	items[Math.floor(Math.random() * items.length)];

const productionDomain = 'theideaofnorth2.com';

export const apiUri = `http://${productionDomain}/api/`;

export const imagesUri = process.env.NODE_ENV === 'development'
	? '/assets/images'
	: `http://images.${productionDomain}`;
export const soundsUri = process.env.NODE_ENV === 'development'
	? '/assets/sounds'
	: `http://sounds.${productionDomain}`;
