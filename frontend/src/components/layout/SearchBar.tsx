// SearchBar.tsx
import React, { useState } from 'react';
import { InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  onSearch: (term: string) => void;  // Callback to handle the search action
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div>
      <InputBase
       sx={{ ml: 1, flex: 1, background: 'white', borderRadius: 1, paddingLeft: '10px' }}
       placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <IconButton
        type="submit"
        sx={{ p: '10px' }}
        aria-label="search"
        onClick={handleSearch}
      >
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchBar;
