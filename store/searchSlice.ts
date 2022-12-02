import type { SearchSlice } from '../types';
import { SliceType } from '../types/zustand/store';

// TODO: Create proper type somewhere?
type SearchResultsType = {
  topResult: {};
  albums: { items: any[]; next: string };
  artists: { items: any[]; next: string };
  tracks: { items: any[]; next: string };
};

const searchSlice: SliceType<SearchSlice> = (set) => ({
  search: '',
  setSearch: (searchString) =>
    set(
      (state) => ({ search: { ...state.search, search: searchString } }),
      false,
      'search/setSearch'
    ),
  isFocus: false,
  setIsFocus: (isFocus) =>
    set(
      (state) => ({ search: { ...state.search, isFocus } }),
      false,
      'search/setIsFocus'
    ),
  searchResults: {
    topResult: {},
    albums: { items: [], next: '' },
    artists: { items: [], next: '' },
    tracks: { items: [], next: '' },
  },
  setSearchResults: (searchResults: SearchResultsType) =>
    set(
      (state) => ({ search: { ...state.search, searchResults } }),
      false,
      'search/setSearchResults'
    ),
  addSearchResults: (searchResults, type) =>
    set(
      (state) => ({
        search: {
          ...state.search,
          searchResults: {
            ...state.search.searchResults,
            [type]: {
              ...state.search.searchResults[type],
              items: [
                ...state.search.searchResults[type].items,
                ...searchResults[type].items,
              ],
              next: searchResults[type].next,
            },
          },
        },
      }),
      false,
      'search/addSearchResults'
    ),
  activeCategory: null,
  setActiveCategory: (type) =>
    set(
      (state) => ({
        search: {
          ...state.search,
          activeCategory: type,
        },
      }),
      false,
      'search/setActiveCategory'
    ),
});

export default searchSlice;
