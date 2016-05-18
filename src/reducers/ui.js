const defaultState = {
	citie_hover: null,
	interview_hover: null,
};

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'CITIE_MOUSE_ENTER':
			return {
				...state,
				citie_hover: action.citie,
			};
		case 'CITIE_MOUSE_LEAVE':
			return {
				...state,
				citie_hover: null,
			};
		case 'INTERVIEW_MOUSE_ENTER':
			return {
				...state,
				interview_hover: action.interview,
			};
		case 'INTERVIEW_MOUSE_LEAVE':
			return {
				...state,
				interview_hover: null,
			};
		default:
			return state;
	}
}
