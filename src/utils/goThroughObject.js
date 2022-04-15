import createNewBoolObject from "./createNewBoolObject";
import goThroughArray from "./goThroughArray";
import isArray from "./isArray";
import isObject from "./isObject";

const goThroughObject = (obj, compareObj) => {
  let tmpResult;
  for (const key in obj) {
    const value = obj[key];
    if (compareObj[key] === undefined) {
      const objKeys = Object.keys(value);
      if (isArray(value)) {
        if (isObject(value[0])) {
          tmpResult = {
            ...tmpResult,
            [key]: value.map(() => createNewBoolObject(value, objKeys)[0])
          };
        } else {
          tmpResult = {
            ...tmpResult,
            [key]: true
          };
        }
      } else if (isObject(value)) {
        tmpResult = {
          ...tmpResult,
          [key]: createNewBoolObject(value, objKeys)
        };
      } else {
        tmpResult = {
          ...tmpResult,
          [key]: true
        };
      }
      continue;
    }
    if (Object.hasOwnProperty.call(obj, key)) {
      if (isObject(value)) {
        tmpResult = {
          ...tmpResult,
          [key]: goThroughObject(value, compareObj[key])
        };
      } else if (isArray(value)) {
        tmpResult = {
          ...tmpResult,
          [key]: goThroughArray(value, compareObj[key])
        };
      } else {
        tmpResult = {
          ...tmpResult,
          [key]: value !== compareObj[key]
        };
      }
    }
  }
  return tmpResult;
};
export default goThroughObject;
