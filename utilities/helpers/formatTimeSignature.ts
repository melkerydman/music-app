import { fstat } from 'fs';

const formatTimeSignature = (signature: number): string => {
  return `${signature} / 4`;
};
export default formatTimeSignature;
