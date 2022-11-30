import { StateCreator } from 'zustand';
import { SearchSlice } from './searchSlice';

export type SliceType<T> = StateCreator<
  StoreType,
  [['zustand/devtools', never]],
  [],
  T
>;

type StoreType = {
  search: SearchSlice;
};

export default StoreType;
