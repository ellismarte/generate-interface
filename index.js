const lodash = require("lodash");
const { set, get } = lodash;

const generateInterface = obj => {
  if (typeof obj !== "object") {
    throw new Error("argument must be an object");
  }
  if (typeof obj === "object" && obj.length >= 0) {
    throw new Error("argument must be an object");
  }
  const allObjectKeys = getObjectKeys(obj);

  const shape = {};
  allObjectKeys.forEach(key => {
    if (typeof obj[key] === "object") {
      if (obj[key].length >= 0) {
        set(shape, key, []);
      } else {
        set(shape, key, {});
      }
    } else {
      set(shape, key, typeof get(obj, key));
    }
  });
  return shape;
};

const getObjectKeys = (obj, parentKey = "") => {
  let objectKeys = Object.keys(obj);
  let allKeys = [];
  objectKeys.forEach(key => {
    if (!obj[key]) return;
    if (!parentKey) {
      allKeys.push(key);
    }
    if (typeof obj[key] === "object") {
      // if value is an array
      if (obj[key].length && obj[key][0]) {
        // if contents of an array is objects
        if (typeof obj[key][0] === "object") {
          if (parentKey) {
            allKeys.push(`${parentKey}.${key}[0]`);
            const response = getObjectKeys(
              obj[key][0],
              `${parentKey}.${key}[0]`
            );
            allKeys = allKeys.concat(response);
          } else {
            allKeys.push(`${key}[0]`);
            const response = getObjectKeys(obj[key][0], `${key}[0]`);
            allKeys = allKeys.concat(response);
          }
        } else {
          if (parentKey) {
            allKeys.push(`${parentKey}.${key}[0]`);
          } else {
            allKeys.push(`${key}[0]`);
          }
        }
      } else {
        if (parentKey) {
          allKeys.push(`${parentKey}.${key}`);
          const response = getObjectKeys(obj[key], `${parentKey}.${key}`);
          allKeys = allKeys.concat(response);
        } else {
          allKeys.push(`${key}`);
          const response = getObjectKeys(obj[key], `${key}`);
          allKeys = allKeys.concat(response);
        }
      }
    } else {
      if (parentKey) {
        allKeys.push(`${parentKey}.${key}`);
      }
    }
  });
  return allKeys;
};

exports.default = generateInterface;
