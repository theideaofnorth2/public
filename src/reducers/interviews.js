const defaultState = {
	data: [],
	originData: [],
	eggData: [],
	hoveredDestinationInterviewId: null,
	hoveredInterviewId: null,
	selectedInterviewId: null,
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
				originData: getInterviews(action.data).filter(i => i.parent === 'origin'),
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
		case 'INTERVIEW_MOUSE_ENTER':
			return {
				...state,
				hoveredInterviewId: action.interviewId,
			};
		case 'INTERVIEW_MOUSE_LEAVE':
			return {
				...state,
				hoveredInterviewId: null,
			};
		case 'INTERVIEW_SELECTION':
			return {
				...state,
				selectedInterviewId: action.interviewId,
			};
		case 'INTERVIEW_UNSELECTION':
			return {
				...state,
				selectedInterviewId: null,
			};
		case 'EXIT_INTERVIEW_CLICK':
			return {
				...state,
				selectedInterviewId: null,
			};
		default:
			return state;
	}
}
