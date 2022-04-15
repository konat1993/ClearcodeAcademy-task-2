import createNewBoolObject from "./createNewBoolObject";
import goThroughObject from "./goThroughObject";
import isObject from "./isObject";

const goThroughArray = (prevArr, compareNextArr) => {
  let isArrChanged = [];
  if (!isObject(prevArr[0]) && prevArr.length !== compareNextArr.length) {
    isArrChanged = true;
    return isArrChanged;
  }
  if (isObject(prevArr[0])) {
    const longerArray =
      prevArr.length > compareNextArr.length ? prevArr : compareNextArr;
    const shorterArray =
      prevArr.length > compareNextArr.length ? compareNextArr : prevArr;

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
    isArrChanged = !prevArr.every((el, index) => el === compareNextArr[index]);
  }
  return isArrChanged;
};
export default goThroughArray;
