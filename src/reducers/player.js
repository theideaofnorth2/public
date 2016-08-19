import { pickInArray, imagesUri } from 'tion2/utils/tools';

const themesImagesUri = `${imagesUri}/themes`;

const defaultState = {
	interview: null,
	themesImages: [],
	prevImageIndex: 0,
	currentImageIndex: 0,
	themeIndex: -1,
	audioPlaying: false,
	audioTime: 0,
	audioTimeSets: 0,
	displayCurrentTime: 0,
	displayTotalTime: 0,
};

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'PLAYER_INTERVIEW': {
			const themesImages = action.interview.themes.map(theme => {
				const themeImagesDir = action.themes.find(themeDir =>
					themeDir.name === theme.name);
				if (!themeImagesDir) return null;
				const randomImageFile = pickInArray(themeImagesDir.content);
				return `${themesImagesUri}/${theme.name}/${randomImageFile.name}`;
			});
			const displayTotalTime = parseInt(action.interview.duration, 10);
			return {
				...state,
				interview: action.interview,
				themesImages,
				currentImageIndex: 1,
				audioPlaying: true,
				audioTime: 0,
				audioTimeSets: 0,
				displayTotalTime,
			};
		}
		case 'INTERVIEW_UNSELECTION':
			return {
				...defaultState,
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
			const themeIndex = state.interview.themes.findIndex(t => {
				const themeStartTime = t.time / 1000;
				const themeEndTime = themeStartTime + 15;
				return action.time > themeStartTime && action.time < themeEndTime;
			});
			const displayCurrentTime = parseInt(action.time, 10);
			return {
				...state,
				audioTime: action.time,
				prevImageIndex,
				currentImageIndex,
				themeIndex,
				displayCurrentTime,
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
