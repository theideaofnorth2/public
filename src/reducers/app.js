const defaultState = {
	ready: false,
};

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'APP_READY':
			return {
				...state,
				ready: true,
			};
		default:
			return state;
	}
}
