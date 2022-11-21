import create from 'zustand';

type State = {
  search: string;
  setSearch: (search: string) => void;
};

const useStore = create<State>((set) => ({
  search: '',
  setSearch: (searchString) =>
    set((state) => ({ ...state, search: searchString })),
}));

export default useStore;
