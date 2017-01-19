const defaultState = {
	mode: undefined,
	centered: true,
	open: true,
	split: true,
	descriptive: true,
	animating: false,
	hovered: true,
};

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'EXPLORATION_MOUSE_OVER':
			return {
				...state,
				hovered: true,
			};
		case 'EXPLORATION_MOUSE_LEAVE':
			return {
				...state,
				hovered: false,
			};
		case 'EXPLORATION_ANIMATION_START':
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
		case 'MENU_HOME_CLICK':
			return {
				...state,
				...defaultState,
			};
		case 'TOUR_END':
			return {
				...state,
				mode: 'interactive',
			};
		default:
			return state;
	}
}
