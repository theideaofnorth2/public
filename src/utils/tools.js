export const SuperPromise = () => {
  const superPromise = {};
  superPromise.promise = new Promise((resolve, reject) => {
    Object.assign(superPromise, { resolve, reject });
  });
  return superPromise;
};
const productionDomain = "theideaofnorth2.com";

export const getApiUri = () => `https://${productionDomain}/api/`;

export const introductionImageUri =
  "https://theideaofnorth2.com/assets/images/00000000660.jpg";

export const decodeEntities = (() => {
  // this prevents any overhead from creating the object each time
  const element = document.createElement("div");

  const decodeHTMLEntities = stri => {
    let str = stri;
    if (str && typeof str === "string") {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "");
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "");
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = "";
    }

    return str;
  };

  return decodeHTMLEntities;
})();
