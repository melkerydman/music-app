// TODO: Update searchResults and setSearchResults type
// TODO: rename search and setSearch something like searchValue or searchString

export type SearchSlice = {
  isFocus: boolean;
  setIsFocus: (isFocus: boolean) => void;
  search: string;
  setSearch: (search: string) => void;
  // TODO: Import correct type here
  searchResults: {
    topResult: any;
    albums: any;
    artists: any;
    tracks: any;
  };
  setSearchResults: (searchResults: any) => void;
  addSearchResults: (searchResults: any, type: string) => void;
  activeCategory: null | string;
  setActiveCategory: (type: null | string) => void;
};
