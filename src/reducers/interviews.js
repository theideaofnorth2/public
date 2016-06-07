const defaultState = {
	data: [],
	locationData: [],
	eggData: [],
	hoveredDestinationInterviewId: null,
	playingInterviewId: null,
};

const getInterviews = (data) =>
	data.interviews
		.map(interview => Object.assign({
			...interview,
			origin: data.origins.find(o => o._id === interview.originId),
			destination: data.destinations.find(d => d._id === interview.destinationId),
		}));

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'CONFIG_READY': {
			return {
				...state,
				data: getInterviews(action.data),
				locationData: getInterviews(action.data).filter(i => i.parent === 'location'),
				eggData: getInterviews(action.data).filter(i => i.parent === 'egg'),
			};
		}
		case 'DESTINATION_INTERVIEW_MOUSE_ENTER':
			return {
				...state,
				hoveredDestinationInterviewId: action.interviewId,
			};
		case 'DESTINATION_INTERVIEW_MOUSE_LEAVE':
			return {
				...state,
				hoveredDestinationInterviewId: null,
			};
		case 'INTERVIEW_PLAY':
			return {
				...state,
				playingInterviewId: action.interviewId,
			};
		case 'INTERVIEW_STOP':
			return {
				...state,
				playingInterviewId: null,
			};
		case 'EGG_CLOSE':
			return {
				...state,
				playingInterviewId: null,
			};
		case 'INTERVIEW_CLICK': {
			const playingInterviewId = state.playingInterviewId === action.interviewId ?
				null : action.interviewId;
			return {
				...state,
				playingInterviewId,
			};
		}
		default:
			return state;
	}
}
