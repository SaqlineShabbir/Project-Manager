import React from 'react';
import { useDispatch } from 'react-redux';
import { addSearchText } from '../features/filter/filterSlice';

const Search = () => {
  const dispatch = useDispatch();
  //debounce
  const debounceHandler = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const doSearch = (value) => {
    dispatch(addSearchText(value));
  };
  const handleSearch = debounceHandler(doSearch, 1000);
  return (
    <div>
      <input
        class="flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring"
        type="search"
        placeholder="Search for anything…"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
