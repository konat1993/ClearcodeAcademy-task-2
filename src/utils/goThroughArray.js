import createNewBoolObject from "./createNewBoolObject";
import goThroughObject from "./goThroughObject";
import isObject from "./isObject";

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
          goThroughObject(objEl, shorterArray[index])
        ];
      } else {
        const newObjKeys = Object.keys(objEl);
        newObjEl = createNewBoolObject(objEl, newObjKeys);

        isArrChanged = [...isArrChanged, newObjEl];
      }
    });
  } else {
    isArrChanged = !arr.every((el, index) => el === compareArr[index]);
  }
  return isArrChanged;
};
export default goThroughArray;
