const defaultState = {
	data: [{
		viewType: 'main',
	}],
	open: false,
};

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'ORIGIN_CLICK': {
			return {
				...state,
				data: [...state.data, {
					viewType: 'origin',
					originId: action.originId,
				}],
			};
		}
		case 'DESTINATION_INTERVIEW_CLICK': {
			return {
				...state,
				data: [...state.data, {
					viewType: 'interview',
					interviewId: action.interviewId,
				}],
			};
		}
		case 'INTERVIEW_CLICK': {
			return {
				...state,
				data: [...state.data, {
					viewType: 'interview',
					interviewId: action.interviewId,
				}],
			};
		}
		case 'STORIES_TOGGLE': {
			return {
				...state,
				open: !state.open,
			};
		}
		default:
			return state;
	}
}
