"use client";

import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSearch = () => {
    if (input.trim()) {
      onSearch(input);
      setInput('');
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-2 border rounded"
        placeholder="Buscar ciudad..."
      />
      <button
        onClick={handleSearch}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;