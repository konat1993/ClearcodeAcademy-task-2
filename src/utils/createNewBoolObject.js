import isObject from "./isObject";

const createNewBoolObject = (obj, objKeys) => {
  let createBoolObj = {};
  objKeys.forEach((key) => {
    if (isObject(obj[key])) {
      const nestedObjKeys = Object.keys(obj[key]);

      createBoolObj = {
        ...createBoolObj,
        [key]: createNewBoolObject(obj[key], nestedObjKeys)
      };
    } else {
      createBoolObj = {
        ...createBoolObj,
        [key]: true
      };
    }
  });
  return createBoolObj;
};

export default createNewBoolObject;
