import isObject from "./isObject";

const deepCompare = (firstValue: any, secondValue: any) => {
  if (!isObject(firstValue) || !isObject(secondValue)) return firstValue === secondValue;

  const keys1 = Object.keys(firstValue)
  const keys2 = Object.keys(secondValue)

  if (keys1.length !== keys2.length) return false

  let areObjectsEqual = true;

  keys1.forEach(key => {
    const valueInObject1 = firstValue[key]
    const valueInObject2 = secondValue[key]

    const areObjects = isObject(valueInObject1) && isObject(valueInObject2)

    const areEqual = areObjects ? deepCompare(valueInObject1, valueInObject2) : valueInObject1 === valueInObject2

    if (areEqual) {
      areObjectsEqual = false;
    }
  })

  return areObjectsEqual;
}

export default deepCompare;
