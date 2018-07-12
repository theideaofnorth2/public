import { decodeEntities } from "tion2/utils/tools";

const defaultState = {
  data: null,
  selectedPage: null,
};

const getPages = data => {
  const escapedPages = data.pages.map(p => ({
    name: p.name,
    en: decodeEntities(p.en),
    fr: decodeEntities(p.fr),
  }));
  return {
    approach: escapedPages.find(p => p.name === "approach"),
    about: escapedPages.find(p => p.name === "about"),
    tourEnd: escapedPages.find(p => p.name === "tourEnd"),
  };
};
export default function reducer(state = defaultState, action = null) {
  switch (action.type) {
    case "CONFIG_READY": {
      return {
        ...state,
        data: getPages(action.data),
      };
    }
    case "MENU_APPROACH_CLICK":
      return {
        ...state,
        selectedPage: "approach",
      };
    case "MENU_ABOUT_CLICK":
      return {
        ...state,
        selectedPage: "about",
      };
    case "TOUR_END":
      return {
        ...state,
        selectedPage: "tourEnd",
      };
    default:
      return state;
  }
}
