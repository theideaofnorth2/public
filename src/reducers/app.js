const defaultState = {
	view: 'home',
	ready: false,
	configed: false,
	language: navigator.language === 'fr' ? 'fr' : 'en',
	interfaceDissmissed: false,
	interfaceDissmissable: false,
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
		case 'MOUSE_MOVE_NOT_ON_INTERFACE': {
			return {
				...state,
				interfaceDissmissed: false,
			};
		}
		case 'MOUSE_STOP_FOR_5_SECONDS_NOT_ON_INTERFACE': {
			return {
				...state,
				interfaceDissmissed: true,
			};
		}
		case 'INTERFACE_MOUSE_ENTER': {
			return {
				...state,
				interfaceDissmissable: false,
			};
		}
		case 'INTERFACE_MOUSE_LEAVE': {
			return {
				...state,
				interfaceDissmissable: true,
			};
		}
		default:
			return state;
	}
}
