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

const augmentWithCities = data =>
	data.interviews
		.map(interview => Object.assign({
			...interview,
			origin: data.origins.find(o => o._id === interview.originId),
			destination: data.destinations.find(d => d._id === interview.destinationId),
		}));

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'CONFIG_READY': {
			const fullData = formatThemesCsv(augmentWithCities(action.data));
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
		case 'EXIT_INTERVIEW_CLICK':
			return {
				...state,
				selectedInterviewId: null,
			};
		default:
			return state;
	}
}
