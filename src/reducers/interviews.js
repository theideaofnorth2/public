const defaultState = {
  data: [],
  originData: [],
  eggData: [],
  hoveredDestinationInterviewId: null,
  hoveredInterviewId: null,
  selectedInterviewId: null,
};

const augmentData = data =>
  data.interviews.map(interview => {
    const duration = -1;
    return Object.assign({
      ...interview,
      slideshow: interview.slides,
      duration,
      origin: data.origins.find(o => o._id === interview.originId),
      destination: data.destinations.find(
        d => d._id === interview.destinationId,
      ),
    });
  });

export default function reducer(state = defaultState, action = null) {
  switch (action.type) {
    case "CONFIG_READY": {
      const augmentedData = augmentData(action.data);
      return {
        ...state,
        data: augmentedData,
        distanceData: augmentedData.filter(i => i.destinationId),
        originData: augmentedData.filter(i => i.parent === "origin"),
        eggData: augmentedData.filter(i => i.parent === "egg"),
      };
    }
    case "DESTINATION_INTERVIEW_MOUSE_ENTER":
      return {
        ...state,
        hoveredDestinationInterviewId: action.interviewId,
      };
    case "DESTINATION_INTERVIEW_MOUSE_LEAVE":
      return {
        ...state,
        hoveredDestinationInterviewId: null,
      };
    case "INTERVIEW_MOUSE_ENTER":
      return {
        ...state,
        hoveredInterviewId: action.interviewId,
      };
    case "INTERVIEW_MOUSE_LEAVE":
      return {
        ...state,
        hoveredInterviewId: null,
      };
    case "INTERVIEW_SELECTION":
      return {
        ...state,
        selectedInterviewId: action.interviewId,
      };
    case "INTERVIEW_UNSELECTION":
      return {
        ...state,
        selectedInterviewId: null,
      };
    case "INTERVIEW_AUDIO_DURATION": {
      const data = state.data.map(
        i =>
          i._id !== action.interviewId
            ? i
            : { ...i, duration: action.duration },
      );
      return {
        ...state,
        data,
      };
    }
    default:
      return state;
  }
}
