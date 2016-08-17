import Papa from 'papaparse';

const papaConfig = {
	delimiter: '\t',
	newline: '\r\n',
	dynamicTyping: true,
};

const defaultState = {
	data: [],
	originData: [],
	eggData: [],
	hoveredDestinationInterviewId: null,
	hoveredInterviewId: null,
	selectedInterviewId: null,
	slideshowFirstImageIndex: 0,
	slideshowSecondImageIndex: 1,
	slideshowThirdImageIndex: 2,
};

const formatThemesCsv = interviews =>
	interviews.map(interview => {
		const parsedThemes = Papa.parse(interview.themes, papaConfig).data;
		const formattedThemes = parsedThemes.map(parsedTheme => Object.assign({
			time: parsedTheme[0],
			theme: parsedTheme[1],
		}));
		return Object.assign({}, interview, { themes: formattedThemes });
	});

const augmentWithData = data => {
	const interviewsImagesFolder = data.assets
		.find(d => typeof d.images !== 'undefined')
		.images
		.find(d => typeof d.interviews !== 'undefined')
		.interviews;
	return data.interviews
		.map(interview => {
			const interviewImagesFolder = interviewsImagesFolder
				.find(d => typeof d[interview.image] !== 'undefined');
			const interviewImages = !interviewImagesFolder
				? []
				: interviewImagesFolder[interview.image].sort();
			return Object.assign({
				...interview,
				images: interviewImages,
				origin: data.origins.find(o => o._id === interview.originId),
				destination: data.destinations.find(d => d._id === interview.destinationId),
			});
		});
};

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'CONFIG_READY': {
			const fullData = formatThemesCsv(augmentWithData(action.data));
			return {
				...state,
				data: fullData,
				originData: fullData.filter(i => i.parent === 'origin'),
				eggData: fullData.filter(i => i.parent === 'egg'),
			};
		}
		case 'DESTINATION_INTERVIEW_MOUSE_ENTER':
			return {
				...state,
				hoveredDestinationInterviewId: action.interviewId,
			};
		case 'DESTINATION_INTERVIEW_MOUSE_LEAVE':
			return {
				...state,
				hoveredDestinationInterviewId: null,
			};
		case 'INTERVIEW_MOUSE_ENTER':
			return {
				...state,
				hoveredInterviewId: action.interviewId,
			};
		case 'INTERVIEW_MOUSE_LEAVE':
			return {
				...state,
				hoveredInterviewId: null,
			};
		case 'INTERVIEW_SELECTION':
			return {
				...state,
				selectedInterviewId: action.interviewId,
			};
		case 'INTERVIEW_UNSELECTION':
			return {
				...state,
				selectedInterviewId: null,
				slideshowFirstImageIndex: 0,
				slideshowSecondImageIndex: 1,
				slideshowThirdImageIndex: 2,
			};
		case 'NEXT_INTERVIEW_IMAGE': {
			const selectedInterview = state.data.find(i => i._id === action.interviewId);
			const secondIndex = state.slideshowSecondImageIndex === selectedInterview.images.length - 1
				? 1
				: state.slideshowSecondImageIndex + 1;
			const thirdIndex = state.slideshowThirdImageIndex === selectedInterview.images.length - 1
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
