const defaultState = {
  isCapture: document.location.search.indexOf('capture') !== -1,
  isDebug: document.location.search.indexOf('debug') !== -1,
  isLight: document.location.search.indexOf('light') !== -1,
  configed: false,
  zoomersLoaded: false,
  ready: false,
  language: window.navigator.language === 'fr' ? 'fr' : 'en',
  view: 'intro',
  languageHovered: false,
};

export default function reducer(state = defaultState, action = null) {
  switch (action.type) {
    case 'CONFIG_READY':
      return {
        ...state,
        configed: true,
      };
    case 'ZOOMERS_MOUNTED':
      return {
        ...state,
        zoomersLoaded: true,
      };
    case 'APP_READY':
      return {
        ...state,
        ready: true,
      };
    case 'INTRODUCTION_END':
      return {
        ...state,
        view: 'waiting',
      };
    case 'INTRODUCTION_SKIP':
      return {
        ...state,
        view: 'waiting',
      };
    case 'EXPLORATION_ANIMATION_START':
      return {
        ...state,
        view: 'home',
      };
    case 'LANGUAGE_MOUSE_OVER':
      return {
        ...state,
        languageHovered: true,
      };
    case 'LANGUAGE_MOUSE_LEAVE':
      return {
        ...state,
        languageHovered: false,
      };
    case 'LANGUAGE_SELECTION':
      return {
        ...state,
        language: action.language,
      };
    case 'EXPLORATION_ANIMATION_FINISHED':
      return {
        ...state,
        view: 'mapp',
      };
    case 'MENU_HOME_CLICK':
      return {
        ...state,
        view: 'home',
      };
    case 'MENU_APPROACH_CLICK':
      return {
        ...state,
        view: 'page',
      };
    case 'MENU_ABOUT_CLICK':
      return {
        ...state,
        view: 'page',
      };
    case 'TOUR_END':
      return {
        ...state,
        view: 'page',
      };
    case 'EXIT_CONTENT_CLICK':
      return {
        ...state,
        view: 'mapp',
      };
    default:
      return state;
  }
}
