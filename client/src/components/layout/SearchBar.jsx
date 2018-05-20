import React, { Component } from "react";
import styled from "styled-components";

const Search = styled.div`
  justify-self: end;
  outline: none;
  display: flex;
  justify-content: space-evenly;
`;

const SearchContent = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  border-bottom: 2px solid #7d48df;
  align-items: center;
`;

const SearchTerm = styled.input`
  padding: 3% 2%;
  border: none;
  width: 400px;

  > &:focus {
    outline: none;
  }
`;

const Icon = styled.i`
  padding: 0 2%;
  background: #7d48df;
  height: 100%;
  color: #fff;
`;

class SearchBar extends Component {
  render() {
    return (
      <Search>
        <SearchContent>
          <Icon className="icon fa fa-search fa-2x" />
          <SearchTerm type="text" class="searchTerm" placeholder="Keywords" />
        </SearchContent>
        <SearchContent>
          <Icon className="icon fas fa-location-arrow fa-2x" />
          <SearchTerm
            type="text"
            className="searchTerm"
            placeholder="Keywords"
          />
        </SearchContent>
      </Search>
    );
  }
}

export default SearchBar;
