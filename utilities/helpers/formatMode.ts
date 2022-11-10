const formatMode = (mode: number): string => {
  switch (mode) {
    case 0:
      return 'Major';
      break;
    case 1:
      return 'Minor';
      break;
    default:
      return;
  }
};

export default formatMode;
