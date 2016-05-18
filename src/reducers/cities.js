const defaultState = {
	status: 'initial',
	data: new Map(),
};

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'CONFIG_READY': {
			const mapFromArray = new Map(action.data.cities.map(
				interview => [interview._id, interview])
			);
			return {
				...state,
				status: 'fetched',
				data: new Map(mapFromArray),
			};
		}
		default:
			return state;
	}
}
