const defaultState = {
	data: [{
		view: 'main',
		future: false,
	}],
	guides: [],
	open: false,
	currentIndex: null,
	nextIndex: null,
};

const getPastData = (data) => data.filter(entrie => !entrie.future);

const getFullGuide = (data, guide) => {
	const interview = data.interviews.find(i => i._id === guide.interviewId);
	const egg = data.eggs.find(e => e._id === guide.eggId);
	const interviewId = guide.interviewId;
	let eggId;
	if (guide.eggId) eggId = guide.eggId;
	else if (interview && interview.eggId) eggId = interview.eggId;
	let originId;
	if (guide.originId) originId = guide.originId;
	else if (egg && egg.originId) originId = egg.originId;
	else if (interview && interview.originId) originId = interview.originId;
	return {
		interviewId,
		eggId,
		originId,
	};
};

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'CONFIG_READY': {
			const guides = action.data.guides.map(guide => Object.assign({
				view: guide.view,
				...getFullGuide(action.data, guide),
				future: true,
			}));
			return {
				...state,
				guides,
			};
		}
		case 'HOME_CHOICE': {
			const data = action.choice === 'interactive' ? state.data : state.guides;
			return {
				...state,
				data,
				currentIndex: 0,
			};
		}
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
			let storie;
			if (action.interviewId && action.eggId) {
				storie = {
					view: 'egg',
					eggId: action.eggId,
					originId: action.originId,
					future: false,
				};
			} else if (
				(action.interviewId && !action.eggId) ||
				(!action.interviewId && action.eggId)
			) {
				storie = {
					view: 'origin',
					originId: action.originId,
					future: false,
				};
			} else {
				storie = {
					view: 'main',
					future: false,
				};
			}
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
