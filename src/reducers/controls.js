const defaultState = {
	visible: true,
	hovered: true,
};

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'CONTROLS_SHOW': {
			return {
				...state,
				visible: true,
			};
		}
		case 'CONTROLS_HIDE': {
			return {
				...state,
				visible: false,
			};
		}
		case 'CONTROLS_MOUSE_ENTER': {
			return {
				...state,
				hovered: true,
			};
		}
		case 'CONTROLS_MOUSE_LEAVE': {
			return {
				...state,
				hovered: false,
			};
		}
		default:
			return state;
	}
}
