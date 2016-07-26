const defaultState = {
	mode: undefined,
	centered: true,
	open: true,
	split: true,
	descriptive: true,
	animating: false,
};

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'EXPLORATION_ANIMATION_NON_DESCRIPTIVE':
			return {
				...state,
				animating: true,
				descriptive: false,
			};
		case 'EXPLORATION_ANIMATION_NON_SPLIT':
			return {
				...state,
				split: false,
			};
		case 'EXPLORATION_ANIMATION_NON_OPEN':
			return {
				...state,
				open: false,
			};
		case 'EXPLORATION_ANIMATION_NON_CENTERED':
			return {
				...state,
				centered: false,
				animating: false,
			};
		case 'EXPLORATION_SELECTION':
			return {
				...state,
				mode: action.mode,
			};
		default:
			return state;
	}
}
