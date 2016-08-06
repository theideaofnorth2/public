const defaultState = {
	isCapture: document.location.search.indexOf('capture') !== -1,
	configed: false,
	zoomersLoaded: false,
	ready: false,
	language: navigator.language === 'fr' ? 'fr' : 'en',
	view: 'home',
};

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'CONFIG_READY':
			return {
				...state,
				configed: true,
			};
		case 'ZOOMERS_MOUNTED':
			return {
				...state,
				zoomersLoaded: true,
			};
		case 'APP_READY':
			return {
				...state,
				ready: true,
			};
		case 'LANGUAGE_SELECTION':
			return {
				...state,
				language: action.language,
			};
		case 'EXPLORATION_ANIMATION_FINISHED':
			return {
				...state,
				view: 'mapp',
			};
		case 'MENU_HOME_CLICK':
			return {
				...state,
				view: 'home',
			};
		case 'MENU_APPROACH_CLICK':
			return {
				...state,
				view: 'approach',
			};
		case 'MENU_ABOUT_CLICK':
			return {
				...state,
				view: 'about',
			};
		case 'EXIT_CONTENT_CLICK':
			return {
				...state,
				view: 'mapp',
			};
		default:
			return state;
	}
}
