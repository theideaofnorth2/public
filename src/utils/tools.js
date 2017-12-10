export const SuperPromise = () => {
  const superPromise = {};
  superPromise.promise = new Promise((resolve, reject) => {
    Object.assign(superPromise, { resolve, reject });
  });
  return superPromise;
};
const productionDomain = "theideaofnorth2.com";

export const getApiUri = isLight =>
  `http://${productionDomain}/api${isLight ? "-light" : ""}/`;

export const introductionImageUri =
  "http://images.theideaofnorth2.com/00000000659.jpg";
