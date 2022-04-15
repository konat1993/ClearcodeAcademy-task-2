import createNewBoolObject from "./createNewBoolObject";
import goThroughArray from "./goThroughArray";
import isArray from "./isArray";
import isObject from "./isObject";

const goThroughObject = (prevObj, compareNextObj) => {
  let tmpResult;
  const longerObject =
    Object.keys(prevObj).length >= Object.keys(compareNextObj).length
      ? prevObj
      : compareNextObj;
  const shorterObject =
    Object.keys(prevObj).length >= Object.keys(compareNextObj).length
      ? compareNextObj
      : prevObj;

  for (const key in longerObject) {
    const longerObjValue = longerObject[key];

    if (shorterObject[key] === undefined) {
      const objKeys = Object.keys(longerObjValue);
      if (isArray(longerObjValue)) {
        if (isObject(longerObjValue[0])) {
          tmpResult = {
            ...tmpResult,
            [key]: longerObjValue.map(
              () => createNewBoolObject(longerObjValue, objKeys)[0]
            )
          };
        } else {
          tmpResult = {
            ...tmpResult,
            [key]: true
          };
        }
      } else if (isObject(longerObjValue)) {
        tmpResult = {
          ...tmpResult,
          [key]: createNewBoolObject(longerObjValue, objKeys)
        };
      } else {
        tmpResult = {
          ...tmpResult,
          [key]: true
        };
      }
      continue;
    }
    if (Object.hasOwnProperty.call(longerObject, key)) {
      if (isObject(longerObjValue)) {
        tmpResult = {
          ...tmpResult,
          [key]: goThroughObject(longerObjValue, shorterObject[key])
        };
      } else if (isArray(longerObjValue)) {
        tmpResult = {
          ...tmpResult,
          [key]: goThroughArray(longerObjValue, shorterObject[key])
        };
      } else {
        tmpResult = {
          ...tmpResult,
          [key]: longerObjValue !== shorterObject[key]
        };
      }
    }
  }
  return tmpResult;
};
export default goThroughObject;
