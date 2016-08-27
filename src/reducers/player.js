import { pickInArray } from 'tion2/utils/tools';

const defaultState = {
	interview: null,
	themeSlides: [],
	audioPlaying: false,
	audioTime: 0,
	audioTimeSets: 0,
	displayCurrentTime: 0,
	displayTotalTime: 0,
};

const getPhotoSlides = action => {
	const interviewUserSlides = action.interview.slideshow
		.filter(entry => entry.type === 'photo');
	const interviewCoverSlides = [
		{
			previous: true,
			current: true,
			startTime: 0,
			endTime: 0,
			path: `${action.interview.customId}/${action.interview.photos[0]}`,
		}];
	const slides = interviewUserSlides
		.map((slide, index) => {
			let endTime;
			if (slide.endTime) {
				endTime = slide.endTime;
			} else if (index < interviewUserSlides.length - 1) {
				endTime = interviewUserSlides[index + 1].startTime;
			} else {
				endTime = action.interview.duration;
			}
			return {
				previous: false,
				current: false,
				startTime: slide.startTime,
				endTime,
				path: `${action.interview.customId}/${slide.name}`,
			};
		});
	return [...interviewCoverSlides, ...slides];
};

const getThemeSlides = action => Object.assign(
	action.interview.slideshow
		.filter(entry => entry.type === 'theme')
		.map(slide => {
			const themeImagesDir = action.themes.find(themeDir =>
				themeDir.name === slide.name);
			if (!themeImagesDir) return null;
			const randomImageFile = pickInArray(themeImagesDir.content);
			return Object.assign({ previous: false, current: false }, slide, {
				endTime: slide.endTime
					? slide.endTime
					: slide.startTime + 15,
				path: `${slide.name}/${randomImageFile.name}`,
			});
		})
);

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'PLAYER_INTERVIEW': {
			return {
				...state,
				interview: action.interview,
				photoSlides: getPhotoSlides(action),
				themeSlides: getThemeSlides(action),
				audioPlaying: true,
				audioTime: 0,
				audioTimeSets: 0,
				displayTotalTime: action.interview.duration,
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
			const displayCurrentTime = action.time;
			const currentPhotoSlideIndex = state.photoSlides.findIndex(slide => slide.current);
			const nextCurrentPhotoSlideIndex = state.photoSlides.findIndex(slide =>
				slide.startTime <= action.time && slide.endTime > action.time);
			const currentThemeSlideIndex = state.themeSlides.findIndex(slide => slide.current);
			const nextCurrentThemeSlideIndex = state.themeSlides.findIndex(slide =>
				slide.startTime <= action.time && slide.endTime > action.time);
			const photoSlides = state.photoSlides.map((slide, index) => Object.assign({
				...slide,
				previous: currentPhotoSlideIndex === nextCurrentPhotoSlideIndex
					? slide.previous
					: slide.current,
				current: index === nextCurrentPhotoSlideIndex,
			}));
			const themeSlides = state.themeSlides.map((slide, index) => Object.assign({
				...slide,
				previous: currentThemeSlideIndex === nextCurrentThemeSlideIndex
					? slide.previous
					: slide.current,
				current: index === nextCurrentThemeSlideIndex,
			}));
			return {
				...state,
				audioTime: action.time,
				displayCurrentTime,
				photoSlides,
				themeSlides,
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
