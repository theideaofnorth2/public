const defaultState = {
	originVisible: false,
	originUntranslated: false,
	destinationVisible: false,
	distanceVisible: true,
	distanceGrown: false,
	text1Visible: false,
	text2Visible: false,
	text3Visible: false,
	text4Visible: false,
	text5Visible: false,
	text6Visible: false,
	imageVisible: false,
	mapUntranslated: false,
	imageRotating: false,
	skipped: false,
};

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'INTRODUCTION_SKIP':
			return {
				...state,
				originVisible: false,
				destinationVisible: false,
				distanceVisible: false,
				text1Visible: false,
				text2Visible: false,
				text3Visible: false,
				text4Visible: false,
				text5Visible: false,
				text6Visible: false,
				imageVisible: true,
				mapUntranslated: true,
				imageRotating: true,
				skipped: true,
			};
		case 'INTRODUCTION_ORIGIN_SHOW':
			return {
				...state,
				originVisible: true,
			};
		case 'INTRODUCTION_ORIGIN_UNTRANSLATE':
			return {
				...state,
				originUntranslated: true,
			};
		case 'INTRODUCTION_TEXT1_SHOW':
			return {
				...state,
				text1Visible: true,
			};
		case 'INTRODUCTION_TEXT1_HIDE':
			return {
				...state,
				text1Visible: false,
			};
		case 'INTRODUCTION_TEXT2_SHOW':
			return {
				...state,
				text2Visible: true,
			};
		case 'INTRODUCTION_TEXT2_HIDE':
			return {
				...state,
				text2Visible: false,
			};
		case 'INTRODUCTION_IMAGE_SHOW':
			return {
				...state,
				imageVisible: true,
			};
		case 'INTRODUCTION_MAP_UNTRANSLATE':
			return {
				...state,
				mapUntranslated: true,
			};
		case 'INTRODUCTION_DISTANCE_GROW':
			return {
				...state,
				distanceGrown: true,
			};
		case 'INTRODUCTION_DESTINATION_SHOW':
			return {
				...state,
				destinationVisible: true,
			};
		case 'INTRODUCTION_MAP_ELEMENTS_HIDE':
			return {
				...state,
				originVisible: false,
				destinationVisible: false,
				distanceVisible: false,
			};
		case 'INTRODUCTION_IMAGE_ROTATE':
			return {
				...state,
				imageRotating: true,
			};
		case 'INTRODUCTION_TEXT3_SHOW':
			return {
				...state,
				text3Visible: true,
			};
		case 'INTRODUCTION_TEXT3_HIDE':
			return {
				...state,
				text3Visible: false,
			};
		case 'INTRODUCTION_TEXT4_SHOW':
			return {
				...state,
				text4Visible: true,
			};
		case 'INTRODUCTION_TEXT4_HIDE':
			return {
				...state,
				text4Visible: false,
			};
		case 'INTRODUCTION_TEXT5_SHOW':
			return {
				...state,
				text5Visible: true,
			};
		case 'INTRODUCTION_TEXT5_HIDE':
			return {
				...state,
				text5Visible: false,
			};
		case 'INTRODUCTION_TEXT6_SHOW':
			return {
				...state,
				text6Visible: true,
			};
		case 'INTRODUCTION_TEXT6_HIDE':
			return {
				...state,
				text6Visible: false,
			};
		default:
			return state;
	}
}
