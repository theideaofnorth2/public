const defaultState = {
	data: null,
	selectedPage: null,
};

const getPages = data => ({
	approach: data.pages.find(p => p.name === 'approach'),
	about: data.pages.find(p => p.name === 'about'),
	tourEnd: data.pages.find(p => p.name === 'tourEnd'),
});

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'CONFIG_READY': {
			return {
				...state,
				data: getPages(action.data),
			};
		}
		case 'MENU_APPROACH_CLICK':
			return {
				...state,
				selectedPage: 'approach',
			};
		case 'MENU_ABOUT_CLICK':
			return {
				...state,
				selectedPage: 'about',
			};
		case 'TOUR_END':
			return {
				...state,
				selectedPage: 'tourEnd',
			};
		default:
			return state;
	}
}
