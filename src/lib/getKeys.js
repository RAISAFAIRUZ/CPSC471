const getKeys = (obj) => {
  let emptyKeys = [];
  for (let key in obj) {
    if (obj[key] === "" || obj[key] === undefined) {
      emptyKeys.push(key);
    }
  }
  return emptyKeys;
};

export default getKeys;