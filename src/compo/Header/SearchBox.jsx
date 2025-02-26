import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = (props) => {
  return (
    <div className='searchBox relative flex items-center'>
        <SearchIcon className='me-2' />
        <input type="text" placeholder='Effectuez une recherche ...' />
    </div>
  );
}

export default SearchBox;