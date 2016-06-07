const defaultState = {
	data: [],
	hoveredOriginId: null,
	selectedOriginId: null,
};

const getOrigins = (data) =>
	data.origins
		.map(origin => {
			const interviews = data.interviews.filter(interview => origin._id === interview.originId);
			const eggs = data.eggs.filter(egg => origin._id === egg.originId);
			return interviews.length === 0 ? null : Object.assign({
				...origin,
				interviews,
				eggs,
			});
		})
		.filter(origin => origin !== null);

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'CONFIG_READY': {
			return {
				...state,
				data: getOrigins(action.data),
			};
		}
		case 'ORIGIN_MOUSE_ENTER':
			return {
				...state,
				hoveredOriginId: action.originId,
			};
		case 'ORIGIN_MOUSE_LEAVE':
			return {
				...state,
				hoveredOriginId: null,
			};
		case 'ORIGIN_CLICK':
			return {
				...state,
				selectedOriginId: action.originId,
			};
		case 'DESTINATION_INTERVIEW_CLICK':
			return {
				...state,
				selectedOriginId: action.originId,
			};
		default:
			return state;
	}
}
