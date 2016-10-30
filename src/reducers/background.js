const defaultState = {
	prevCitieId: null,
	currentCitieId: null,
	prevCitieType: null,
	currentCitieType: null,
};

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'ORIGIN_MOUSE_ENTER':
			return {
				...state,
				currentCitieId: action.originId,
				currentCitieType: 'origins',
				prevCitieId: state.currentCitieId,
				prevCitieType: state.currentCitieType,
			};
		case 'DESTINATION_MOUSE_ENTER':
			return {
				...state,
				currentCitieId: action.destinationId,
				currentCitieType: 'destinations',
				prevCitieId: state.currentCitieId,
				prevCitieType: state.currentCitieType,
			};
		default:
			return state;
	}
}
