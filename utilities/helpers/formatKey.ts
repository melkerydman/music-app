const formatKey = (key: number): string => {
  switch (key) {
    case 0:
      return 'C';
      break;
    case 1:
      return 'C♯, D♭';
      break;
    case 2:
      return 'D';
      break;
    case 3:
      return 'D♯, E♭';
      break;
    case 4:
      return 'E';
      break;
    case 5:
      return 'F';
      break;
    case 6:
      return 'F♯, G♭';
      break;
    case 7:
      return 'G';
      break;
    case 8:
      return 'G♯, A♭';
      break;
    case 9:
      return 'A';
      break;
    case 10:
      return 'A♯, B♭';
      break;
    case 11:
      return 'B';
      break;
    default:
      return 'Unknown';
  }
};

export default formatKey;
