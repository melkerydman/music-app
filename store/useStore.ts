import create from 'zustand';

type State = {
  isSearching: boolean;
  searchString: string;
  setIsSearching: (isSearching: boolean) => void;
  setSearchString: (searchString: string) => void;
};

const useSearchStore = create<State>((set) => ({
  isSearching: false,
  setIsSearching: (isSearching) => set((state) => ({ ...state, isSearching })),
  searchString: '',
  setSearchString: (searchString) =>
    set((state) => ({ ...state, searchString })),
}));

export default useSearchStore;
