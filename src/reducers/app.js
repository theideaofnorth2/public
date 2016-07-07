const defaultState = {
	home: true,
	ready: false,
	configed: false,
};

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'CONFIG_READY':
			return {
				...state,
				configed: true,
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
		case 'HOME_CHOICE':
			return {
				...state,
				home: false,
			};
		default:
			return state;
	}
}
