const defaultState = {
  volume: 0.8,
  volumeHovered: false,
  egg: null,
  videoPlaying: false,
  interview: null,
  photoSlides: [],
  audioPlaying: false,
  audioTime: 0,
  audioTimeSets: 0,
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
    name: action.interview.image,
  };
  const followingSlidesData = action.interview.slideshow.filter(
    entry => entry.type === "photo",
  );
  const followingSlides = followingSlidesData.map((slide, index) =>
    Object.assign({
      previous: false,
      current: false,
      startTime: slide.startTime,
      endTime:
        slide.endTime ||
        getPhotoSlideEndTime(followingSlidesData, index, action),
      name: slide.name,
    }),
  );
  return [firstSlide, ...followingSlides];
};

const updateSlides = (slides, action) => {
  const currentSlideIndex = slides.findIndex(slide => slide.current);
  const nextCurrentSlideIndex = slides.findIndex(
    slide =>
      slide.startTime <= action.time &&
      (slide.endTime > action.time || slide.endTime === -1),
  );
  return slides.map((slide, index) =>
    Object.assign({
      ...slide,
      previous:
        currentSlideIndex === nextCurrentSlideIndex
          ? slide.previous
          : slide.current,
      current: index === nextCurrentSlideIndex,
    }),
  );
};

export default function reducer(state = defaultState, action = null) {
  switch (action.type) {
    case "PLAYER_EGG": {
      return {
        ...state,
        egg: action.egg,
        videoPlaying: true,
      };
    }
    case "PLAYER_INTERVIEW": {
      return {
        ...state,
        interview: action.interview,
        photoSlides: getPhotoSlides(action),
        audioPlaying: true,
        videoPlaying: false,
      };
    }
    case "INTERVIEW_AUDIO_DURATION": {
      return {
        ...state,
        interview: { ...state.interview, duration: action.duration },
      };
    }
    case "PLAYER_VOLUME_MOUSE_ENTER": {
      return {
        ...state,
        volumeHovered: true,
      };
    }
    case "PLAYER_VOLUME_MOUSE_LEAVE": {
      return {
        ...state,
        volumeHovered: false,
      };
    }
    case "PLAYER_VOLUME_CHANGE": {
      return {
        ...state,
        volume: action.volume,
      };
    }
    case "EXIT_EGG_CLICK":
      return {
        ...state,
        egg: null,
        videoPlaying: false,
      };
    case "EGG_UNSELECTION":
      return {
        ...state,
        egg: null,
        videoPlaying: false,
      };
    case "INTERVIEW_UNSELECTION":
      return {
        ...state,
        interview: null,
        videoPlaying: state.egg !== null,
        photoSlides: [],
        audioPlaying: false,
        audioTime: 0,
        audioTimeSets: 0,
      };
    case "INTERVIEW_AUDIO_TIME_GET": {
      return {
        ...state,
        audioTime: action.time,
        photoSlides: updateSlides(state.photoSlides, action),
      };
    }
    case "INTERVIEW_AUDIO_TIME_SET":
      return {
        ...state,
        audioTime: action.time,
        audioTimeSets: state.audioTimeSets + 1,
      };
    case "INTERVIEW_AUDIO_PLAYING_TOGGLE":
      return {
        ...state,
        audioPlaying: !state.audioPlaying,
      };
    default:
      return state;
  }
}
