const defaultState = {
	view: 'home',
	ready: false,
	configed: false,
	language: 'english',
	mouseMoving: true,
};

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'CONFIG_READY':
			return {
				...state,
				configed: true,
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
		case 'APP_READY':
			return {
				...state,
				ready: true,
			};
		case 'MOUSE_MOVE': {
			return {
				...state,
				mouseMoving: true,
			};
		}
		case 'MOUSE_STOP': {
			return {
				...state,
				mouseMoving: false,
			};
		}
		default:
			return state;
	}
}
