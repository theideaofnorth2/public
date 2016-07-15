const defaultState = {
	home: true,
	ready: false,
	configed: false,
	language: 'english',
	exploration: 'interactive',
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
		case 'EXPLORATION_SELECTION':
			return {
				...state,
				exploration: action.exploration,
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
		default:
			return state;
	}
}
