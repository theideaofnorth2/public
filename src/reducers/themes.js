const defaultState = {
	data: [],
};

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'CONFIG_READY': {
			const imagesDir = action.data.assets.find(dir => dir.name === 'images');
			const themesDir = imagesDir.content.find(dir => dir.name === 'themes');
			return {
				...state,
				data: themesDir.content,
			};
		}
		default:
			return state;
	}
}
