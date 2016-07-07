const defaultState = {
	zooming: false,
	mounted: false,
	direction: 'in',
	originId: null,
};

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'ZOOMERS_MOUNTED':
			return {
				...state,
				mounted: true,
			};
		case 'MAP_ZOOM':
			return {
				...state,
				zooming: true,
				direction: action.direction,
				originId: action.originId,
			};
		case 'MAP_ZOOM_FINISHED':
			return {
				...state,
				zooming: false,
			};
		default:
			return state;
	}
}
