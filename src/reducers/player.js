import { pickInArray } from 'tion2/utils/tools';

const defaultState = {
	interview: null,
	photoSlides: [],
	themeSlides: [],
	audioPlaying: false,
	audioTime: 0,
	audioTimeSets: 0,
	volumeHovered: false,
	volume: 0.8,
};

const getPhotoSlideEndTime = (slides, index, action) => {
	if (index < slides.length - 1) return slides[index + 1].startTime;
	return action.interview.duration;
};

const getPhotoSlides = action => {
	const firstSlide = {
		previous: true,
		current: true,
		startTime: 0,
		endTime: 0,
		path: `${action.interview.customId}/${action.interview.photos[0]}`,
	};
	const followingSlidesData = action.interview.slideshow
		.filter(entry => entry.type === 'photo');
	const followingSlides = followingSlidesData
		.map((slide, index) => Object.assign({
			previous: false,
			current: false,
			startTime: slide.startTime,
			endTime: slide.endTime || getPhotoSlideEndTime(followingSlidesData, index, action),
			path: `${action.interview.customId}/${slide.name}`,
		}));
	return [firstSlide, ...followingSlides];
};

const getThemeSlideEndTime = (slide) => slide.startTime + 15;

const getThemeSlides = action => Object.assign(
	action.interview.slideshow
		.filter(entry => entry.type === 'theme')
		.map(slide => {
			const imagesDir = action.themes.find(themeDir =>
				themeDir.name === slide.name);
			if (!imagesDir) {
				alert(`!! No theme directory named ${slide.name}`);
				return null;
			}
			const randomImageFile = pickInArray(imagesDir.content);
			return Object.assign({
				previous: false,
				current: false,
				startTime: slide.startTime,
				endTime: slide.endTime || getThemeSlideEndTime(slide),
				path: `${slide.name}/${randomImageFile.name}`,
			});
		})
);

const updateSlides = (slides, action) => {
	const currentSlideIndex = slides.findIndex(slide => slide.current);
	const nextCurrentSlideIndex = slides.findIndex(slide =>
		slide.startTime <= action.time && slide.endTime > action.time);
	return slides.map((slide, index) => Object.assign({
		...slide,
		previous: currentSlideIndex === nextCurrentSlideIndex
			? slide.previous
			: slide.current,
		current: index === nextCurrentSlideIndex,
	}));
};

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'PLAYER_INTERVIEW': {
			return {
				...state,
				interview: action.interview,
				photoSlides: getPhotoSlides(action),
				themeSlides: getThemeSlides(action),
				audioPlaying: true,
			};
		}
		case 'PLAYER_VOLUME_MOUSE_ENTER': {
			return {
				...state,
				volumeHovered: true,
			};
		}
		case 'PLAYER_VOLUME_MOUSE_LEAVE': {
			return {
				...state,
				volumeHovered: false,
			};
		}
		case 'PLAYER_VOLUME_CHANGE': {
			return {
				...state,
				volume: action.volume,
			};
		}
		case 'INTERVIEW_UNSELECTION':
			return {
				...defaultState,
			};
		case 'INTERVIEW_AUDIO_TIME_GET': {
			return {
				...state,
				audioTime: action.time,
				photoSlides: updateSlides(state.photoSlides, action),
				themeSlides: updateSlides(state.themeSlides, action),
			};
		}
		case 'INTERVIEW_AUDIO_TIME_SET':
			return {
				...state,
				audioTime: action.time,
				audioTimeSets: state.audioTimeSets + 1,
			};
		case 'INTERVIEW_AUDIO_PLAYING_TOGGLE':
			return {
				...state,
				audioPlaying: !state.audioPlaying,
			};
		default:
			return state;
	}
}
