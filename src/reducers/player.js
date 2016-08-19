const defaultState = {
	selectedInterview: null,
	slideshowFirstImageIndex: 0,
	slideshowSecondImageIndex: 1,
	slideshowThirdImageIndex: 2,
	audioPlaying: false,
	audioTime: 0,
	audioTimeSets: 0,
};

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'INTERVIEW_SELECTION':
			return {
				...state,
				selectedInterview: action.interview,
				audioPlaying: true,
				audioTime: 0,
				audioTimeSets: 0,
			};
		case 'INTERVIEW_UNSELECTION':
			return {
				...state,
				selectedInterview: null,
				slideshowFirstImageIndex: 0,
				slideshowSecondImageIndex: 1,
				slideshowThirdImageIndex: 2,
				audioPlaying: false,
			};
		case 'INTERVIEW_AUDIO_PLAYING_TOGGLE':
			return {
				...state,
				audioPlaying: !state.audioPlaying,
			};
		case 'INTERVIEW_AUDIO_TIME_GET':
			return {
				...state,
				audioTime: action.time,
			};
		case 'INTERVIEW_AUDIO_TIME_SET':
			return {
				...state,
				audioTime: action.time,
				audioTimeSets: state.audioTimeSets + 1,
			};
		case 'NEXT_INTERVIEW_IMAGE': {
			const secondIndex =
				state.slideshowSecondImageIndex === state.selectedInterview.images.length - 1
				? 1
				: state.slideshowSecondImageIndex + 1;
			const thirdIndex =
				state.slideshowThirdImageIndex === state.selectedInterview.images.length - 1
				? 2
				: state.slideshowThirdImageIndex + 1;
			return {
				...state,
				slideshowFirstImageIndex: state.slideshowSecondImageIndex,
				slideshowSecondImageIndex: secondIndex,
				slideshowThirdImageIndex: thirdIndex,
			};
		}
		default:
			return state;
	}
}
