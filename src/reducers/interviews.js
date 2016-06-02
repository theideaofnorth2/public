const defaultState = {
	data: [],
	hoveredDestinationInterview: null,
	playingInterview: null,
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
		case 'DESTINATION_INTERVIEW_MOUSE_ENTER':
			return {
				...state,
				hoveredDestinationInterview: action.interview,
			};
		case 'DESTINATION_INTERVIEW_MOUSE_LEAVE':
			return {
				...state,
				hoveredDestinationInterview: null,
			};
		case 'INTERVIEW_PLAY':
			return {
				...state,
				playingInterview: action.interview,
			};
		case 'INTERVIEW_STOP':
			return {
				...state,
				playingInterview: null,
			};
		case 'INTERVIEW_CLICK': {
			const playingInterview = state.playingInterview === action.interview ?
				null : action.interview;
			return {
				...state,
				playingInterview,
			};
		}
		default:
			return state;
	}
}
