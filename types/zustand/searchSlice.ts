// TODO: Update searchResults and setSearchResults type
// TODO: rename search and setSearch something like searchValue or searchString

export type SearchSlice = {
  isFocus: boolean;
  setIsFocus: (isFocus: boolean) => void;
  search: string;
  setSearch: (search: string) => void;
  searchResults: {};
  setSearchResults: (searchResults: {}) => void;
};
