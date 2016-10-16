const defaultState = {
	data: [],
	coverDestinationId: null,
	hoveredDestinationId: null,
};

const getDestinations = data =>
	data.destinations
		.map(destination => {
			const interviews = data.interviews.filter(
				interview => destination._id === interview.destinationId
			);
			return interviews.length === 0 ? null : Object.assign({
				...destination,
				interviews,
			});
		})
		.filter(destination => destination !== null);

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'CONFIG_READY': {
			return {
				...state,
				data: getDestinations(action.data),
			};
		}
		case 'DESTINATION_MOUSE_ENTER':
			return {
				...state,
				hoveredDestinationId: action.destinationId,
				coverDestinationId: action.destinationId,
			};
		case 'DESTINATION_MOUSE_LEAVE':
			return {
				...state,
				hoveredDestinationId: null,
			};
		default:
			return state;
	}
}
