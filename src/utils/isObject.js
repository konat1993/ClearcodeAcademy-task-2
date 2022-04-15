const isObject = (value) => {
  return typeof value === "object" && !Array.isArray(value);
};
export default isObject;
