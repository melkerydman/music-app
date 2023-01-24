import create from 'zustand';
import { devtools } from 'zustand/middleware';
import StoreType from '../types/zustand/store';

import searchSlice from './searchSlice';

const useStore = create<StoreType, [['zustand/devtools', never]]>(
  devtools((...a) => ({
    search: searchSlice(...a),
  }))
);

export default useStore;
