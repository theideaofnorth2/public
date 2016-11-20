const defaultState = {
	data: [],
	originData: [],
	eggData: [],
	hoveredDestinationInterviewId: null,
	hoveredInterviewId: null,
	selectedInterviewId: null,
};

const augmentData = data => {
	const interviewsSoundsFolder = data.assets
		.find(entry => entry.name === 'sounds')
		.content;
	const interviewsPhotosFolder = data.assets
		.find(entry => entry.name === 'images')
		.content
		.find(entry => entry.name === 'interviews')
		.content;
	return data.interviews
		.map(interview => {
			const photosFolder = interviewsPhotosFolder
				.find(entry => entry.name === interview.customId);
			const photos = !photosFolder
				? []
				: photosFolder.content.map(e => e.name).sort();
			const slideshow = data.slideshow[interview.customId] || [];
			const soundFile = interviewsSoundsFolder
				.find(entry => entry.name === interview.sound);
			const duration = !soundFile ? null : parseInt(soundFile.duration, 10);
			return Object.assign({
				...interview,
				photos,
				slideshow,
				duration,
				origin: data.origins.find(o => o._id === interview.originId),
				destination: data.destinations.find(d => d._id === interview.destinationId),
			});
		});
};

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'CONFIG_READY': {
			const augmentedData = augmentData(action.data);
			return {
				...state,
				data: augmentedData,
				distanceData: augmentedData.filter(i => i.destinationId),
				originData: augmentedData.filter(i => i.parent === 'origin'),
				eggData: augmentedData.filter(i => i.parent === 'egg'),
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
