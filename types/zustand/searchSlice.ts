// TODO: rename search and setSearch something like searchValue or searchString

export type SearchSlice = {
  isFocus: boolean;
  setIsFocus: (isFocus: boolean) => void;
  search: string;
  setSearch: (search: string) => void;
  searchResults: SpotifyApi.SearchResponse;
  setSearchResults: (searchResults: SpotifyApi.SearchResponse) => void;
  addSearchResults: (
    searchResults: SpotifyApi.SearchResponse,
    type: string
  ) => void;
  activeCategory: null | string;
  setActiveCategory: (type: null | string) => void;
};
