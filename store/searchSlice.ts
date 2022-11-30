import type { SearchSlice } from '../types';
import { SliceType } from '../types/zustand/store';

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
  searchResults: {},
  setSearchResults: (searchResults) =>
    set(
      (state) => ({ search: { ...state.search, searchResults } }),
      false,
      'search/setSearchResults'
    ),
});

export default searchSlice;
