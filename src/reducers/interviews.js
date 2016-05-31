const defaultState = {
	data: [],
};

const getInterviews = (interviews, cities) =>
	interviews
		.map(interview => Object.assign({
			...interview,
			origin: cities.find(c => c._id === interview.origin),
			destination: cities.find(c => c._id === interview.destination),
		}))
		.filter(interview => interview.parent === 'location');

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'CONFIG_READY': {
			return {
				...state,
				data: getInterviews(action.data.interviews, action.data.cities),
			};
		}
		default:
			return state;
	}
}
