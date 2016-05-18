const defaultState = {
	ready: false,
	initialized: false,
};

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'MAP_INITIALIZED':
			return {
				...state,
				initialized: true,
			};
		case 'MAP_READY':
			return {
				...state,
				ready: true,
			};
		default:
			return state;
	}
}
