const handleClassName = (classNameArray: string[]) =>
  classNameArray.filter((className) => className).join(' ');

export default handleClassName;
