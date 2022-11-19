import { createContext, useCallback, useContext, useReducer } from 'react';

export const useSearch = (): {
  search: string;
  setSearch: (search: string) => void;
} => {
  type SearchState = {
    search: string;
  };

  type SearchAction = {
    type: 'setSearch';
    payload: string;
  };

  const [{ search }, dispatch] = useReducer(
    (state: SearchState, action: SearchAction) => {
      switch (action.type) {
        case 'setSearch':
          return { ...state, search: action.payload };
        default:
          return { ...state };
      }
    },
    { search: '' }
  );

  const setSearch = useCallback((s: string) => {
    dispatch({
      type: 'setSearch',
      payload: s,
    });
  }, []);

  return {
    search,
    setSearch,
  };
};

const SearchContext = createContext<ReturnType<typeof useSearch>>(
  {} as unknown as ReturnType<typeof useSearch>
);

export function useSearchContext() {
  return useContext(SearchContext);
}

export function SearchProvider({ children }: { children: React.ReactNode }) {
  return (
    <SearchContext.Provider value={useSearch()}>
      {children}
    </SearchContext.Provider>
  );
}
