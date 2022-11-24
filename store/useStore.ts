// TODO: Rename this and create slice
import create from 'zustand';

type State = {
  isFocus: boolean;
  setIsFocus: (isFocus: boolean) => void;
  search: string;
  setSearch: (search: string) => void;
};

const useStore = create<State>((set) => ({
  search: '',
  setSearch: (searchString) =>
    set((state) => ({ ...state, search: searchString })),
  isFocus: false,
  setIsFocus: (isFocus) => set((state) => ({ ...state, isFocus })),
}));

export default useStore;
