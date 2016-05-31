const defaultState = {
	visible: false,
};

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'MAP_CENTERING_FINISHED':
			return {
				...state,
				visible: true,
			};
		case 'MAP_ZOOMING_FINISHED':
			return {
				...state,
				visible: false,
			};
		default:
			return state;
	}
}
