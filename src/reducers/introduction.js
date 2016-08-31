const defaultState = {
	backgroundTranslating: false,
	backgroundRotating: false,
};

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'INTRODUCTION_BACKGROUND_TRANSLATE':
			return {
				...state,
				backgroundTranslating: true,
			};
		case 'INTRODUCTION_BACKGROUND_ROTATE':
			return {
				...state,
				backgroundTranslating: false,
				backgroundRotating: true,
			};
		case 'INTRODUCTION_BACKGROUND_ROTATE_FINISH':
			return {
				...state,
				backgroundRotating: false,
			};
		default:
			return state;
	}
}
