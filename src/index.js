import { goThroughObject, isObject } from "./utils";

export const compare = (prev, next) => {
  if (!isObject(prev) || !isObject(next)) return null;

  let result = { ...prev };
  result = goThroughObject(prev, next);
  return result;
};
