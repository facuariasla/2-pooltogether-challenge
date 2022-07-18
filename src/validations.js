export const ageValidator = (value) => {
  return value >= 18;
};

export const cardNumberLengthValid = (value) => {
  // let deleteSpaces = value.split(' ').join('');
  let toStr = value.toString();
  let firstFour = toStr.substr(0, 4);
  let toInt = parseInt(firstFour);
  return toStr.length === 16 && toInt >= 4200;
};
export const CardCVV = (value) => {
  let toStr = value.toString();
  return toStr.length === 3;
};
export const positiveAmount = (value) => {
  return value > 10
}