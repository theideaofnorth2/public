const defaultState = {
	home: true,
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
				home: false,
			};
		case 'APP_READY':
			return {
				...state,
				ready: true,
			};
		case 'HOME_BACK':
			return {
				...state,
				home: true,
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
