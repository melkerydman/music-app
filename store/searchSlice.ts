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
  setSearchResults: (searchResults: SpotifyApi.SearchResponse) =>
    set(
      (state) => ({
        search: { ...state.search, searchResults },
      }),
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
              ...searchResults[type],
              items: [
                ...state.search.searchResults[type].items,
                ...searchResults[type].items,
              ],
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
