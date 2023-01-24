const getStringBetween = (str, start, end) =>
  str.split(start).pop().split(end)[0];

export default getStringBetween;
