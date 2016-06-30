const defaultState = {
	data: [{
		view: 'main',
		future: false,
	}],
	open: false,
	currentIndex: null,
	nextIndex: null,
};

const getPastData = (data) => data.filter(entrie => !entrie.future);

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'ORIGIN_CLICK': {
			const data = [...getPastData(state.data), {
				view: 'origin',
				originId: action.originId,
				future: false,
			}];
			return {
				...state,
				data,
				currentIndex: data.length - 1,
			};
		}
		case 'EGG_CLICK': {
			const data = [...getPastData(state.data), {
				view: 'egg',
				eggId: action.eggId,
				originId: action.originId,
				future: false,
			}];
			return {
				...state,
				data,
				currentIndex: data.length - 1,
			};
		}
		case 'EXIT_CLICK': {
			const storie = action.originId ?
			{
				view: 'origin',
				originId: action.originId,
				future: false,
			} : {
				view: 'main',
				future: false,
			};
			const data = [...getPastData(state.data), storie];
			return {
				...state,
				data,
				currentIndex: data.length - 1,
			};
		}
		case 'DESTINATION_INTERVIEW_CLICK': {
			const data = [...getPastData(state.data), {
				view: 'interview',
				interviewId: action.interviewId,
				originId: action.originId,
				eggId: action.eggId,
				future: false,
			}];
			return {
				...state,
				data,
				currentIndex: data.length - 1,
			};
		}
		case 'INTERVIEW_SELECTION_CLICK': {
			const lastItem = state.data[state.data.length - 1];
			if (lastItem.interviewId === action.interviewId) return state;
			const data = [...getPastData(state.data), {
				view: 'interview',
				interviewId: action.interviewId,
				originId: action.originId,
				eggId: action.eggId,
				future: false,
			}];
			return {
				...state,
				data,
				currentIndex: data.length - 1,
			};
		}
		case 'STORIES_TOGGLE': {
			return {
				...state,
				open: !state.open,
			};
		}
		case 'STORIE_CLICK': {
			const pastData = state.data.slice(0, action.index + 1)
				.map(storie => Object.assign({}, storie, {
					future: false,
				}));
			const futureData = state.data.slice(action.index + 1, state.data.length)
				.map(storie => Object.assign({}, storie, {
					future: true,
				}));
			return {
				...state,
				data: [...pastData, ...futureData],
				nextIndex: action.index,
			};
		}
		case 'STORIE_ANIMATION_END': {
			return {
				...state,
				currentIndex: state.nextIndex,
				nextIndex: null,
			};
		}
		default:
			return state;
	}
}
