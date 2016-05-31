const defaultState = {
	data: [],
};

const getOrigins = (cities, interviews) =>
	cities
		.map(citie => {
			const originOf = interviews.filter(interview => citie._id === interview.origin);
			const destinationOf = interviews.filter(interview => citie._id === interview.destination);
			if (originOf.length === 0 || destinationOf.length !== 0) return null;
			return Object.assign({
				...citie,
				originOf,
			});
		})
		.filter(citie => citie !== null);

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'CONFIG_READY': {
			return {
				...state,
				data: getOrigins(action.data.cities, action.data.interviews),
			};
		}
		default:
			return state;
	}
}
