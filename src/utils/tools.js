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
