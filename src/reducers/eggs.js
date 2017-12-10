const defaultState = {
  data: [],
  hoveredEggId: null,
  selectedEggId: null,
};

const getEggs = data =>
  data.eggs.map(egg => {
    const interviews = data.interviews.filter(
      interview => egg._id === interview.eggId,
    );
    return Object.assign({
      ...egg,
      interviews,
      videoLoop: egg._id === 4,
    });
  });

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
    case 'EGG_SELECTION':
      return {
        ...state,
        selectedEggId: action.eggId,
      };
    case 'EGG_UNSELECTION':
      return {
        ...state,
        selectedEggId: null,
      };
    case 'EXIT_EGG_CLICK':
      return {
        ...state,
        selectedEggId: null,
      };
    default:
      return state;
  }
}
