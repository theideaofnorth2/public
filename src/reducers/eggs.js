const defaultState = {
	data: [],
	hoveredEggId: null,
	selectedEggId: null,
};

const getEggs = (data) =>
	data.eggs
		.map(egg => {
			const interviews = data.interviews.filter(interview => egg._id === interview.eggId);
			return interviews.length === 0 ? null : Object.assign({
				...egg,
				interviews,
			});
		})
		.filter(egg => egg !== null);

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'CONFIG_READY': {
			return {
				...state,
				data: getEggs(action.data),
			};
		}
		case 'EGG_MOUSE_ENTER':
			return {
				...state,
				hoveredEggId: action.eggId,
			};
		case 'EGG_MOUSE_LEAVE':
			return {
				...state,
				hoveredEggId: null,
			};
		case 'EGG_CLICK':
			return {
				...state,
				selectedEggId: action.eggId,
			};
		case 'EGG_CLOSE':
			return {
				...state,
				selectedEggId: null,
			};
		default:
			return state;
	}
}
