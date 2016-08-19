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
	const interviewsSoundsFolder = data.assets
		.find(entry => entry.name === 'sounds')
		.content;
	const interviewsImagesFolder = data.assets
		.find(entry => entry.name === 'images')
		.content
		.find(entry => entry.name === 'interviews')
		.content;
	return data.interviews
		.map(interview => {
			const interviewImagesFolder = interviewsImagesFolder
				.find(entry => entry.name === interview.image);
			const interviewImages = !interviewImagesFolder
				? []
				: interviewImagesFolder.content.map(e => e.name).sort();
			const interviewSoundFile = interviewsSoundsFolder
				.find(entry => entry.name === interview.sound);
			const interviewSoundDuration = !interviewSoundFile
				? 0
				: interviewSoundFile.duration;
			return Object.assign({
				...interview,
				images: interviewImages,
				duration: interviewSoundDuration,
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
			};
		default:
			return state;
	}
}
