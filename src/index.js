const isObject = (value) => {
  return typeof value === "object" && !Array.isArray(value);
};
const isArray = (value) => {
  return Array.isArray(value);
};

const createNewBoolObj = (obj, objKeys) => {
  let createBoolObj = {};
  objKeys.forEach((key) => {
    if (isObject(obj[key])) {
      const nestedObjKeys = Object.keys(obj[key]);

      createBoolObj = {
        ...createBoolObj,
        [key]: createNewBoolObj(obj[key], nestedObjKeys)
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
const goThroughArray = (arr, compareArr) => {
  let isArrChanged = [];
  if (!isObject(arr[0]) && arr.length !== compareArr.length) {
    isArrChanged = true;
    return isArrChanged;
  }
  if (isObject(arr[0])) {
    const longerArray = arr.length > compareArr.length ? arr : compareArr;
    const shorterArray = arr.length > compareArr.length ? compareArr : arr;

    let newObjEl = {};
    longerArray.forEach((objEl, index) => {
      const elements = index + 1;
      if (elements <= shorterArray.length) {
        isArrChanged = [
          ...isArrChanged,
          goThroughObj(objEl, shorterArray[index])
        ];
      } else {
        const newObjKeys = Object.keys(objEl);
        newObjEl = createNewBoolObj(objEl, newObjKeys);

        isArrChanged = [...isArrChanged, newObjEl];
      }
    });
  } else {
    isArrChanged = !arr.every((el, index) => el === compareArr[index]);
  }
  return isArrChanged;
};

const goThroughObj = (obj, compareObj) => {
  let tmpResult;
  for (const key in obj) {
    const value = obj[key];
    if (compareObj[key] === undefined) {
      const objKeys = Object.keys(value);
      if (isArray(value)) {
        if (isObject(value[0])) {
          tmpResult = {
            ...tmpResult,
            [key]: value.map(() => createNewBoolObj(value, objKeys)[0])
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
          [key]: createNewBoolObj(value, objKeys)
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
          [key]: goThroughObj(value, compareObj[key])
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

export const compare = (prev, next) => {
  let result = { ...prev };

  result = goThroughObj(prev, next);
  return result;
};
