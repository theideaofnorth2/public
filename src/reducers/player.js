const defaultState = {
	interview: null,
	prevImageIndex: 0,
	currentImageIndex: 0,
	audioPlaying: false,
	audioTime: 0,
	audioTimeSets: 0,
};

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'PLAYER_INTERVIEW':
			return {
				...state,
				interview: action.interview,
				currentImageIndex: 1,
				audioPlaying: true,
				audioTime: 0,
				audioTimeSets: 0,
			};
		case 'INTERVIEW_UNSELECTION':
			return {
				...state,
				interview: null,
				prevImageIndex: 0,
				currentImageIndex: 0,
				audioPlaying: false,
			};
		case 'INTERVIEW_AUDIO_PLAYING_TOGGLE':
			return {
				...state,
				audioPlaying: !state.audioPlaying,
			};
		case 'INTERVIEW_AUDIO_TIME_GET': {
			const currentImageIndex = parseInt(action.time / state.interview.slideDuration, 10) + 1;
			const prevImageIndex = currentImageIndex !== state.currentImageIndex
				? state.currentImageIndex
				: state.prevImageIndex;
			return {
				...state,
				audioTime: action.time,
				prevImageIndex,
				currentImageIndex,
			};
		}
		case 'INTERVIEW_AUDIO_TIME_SET':
			return {
				...state,
				audioTime: action.time,
				audioTimeSets: state.audioTimeSets + 1,
			};
		default:
			return state;
	}
}
