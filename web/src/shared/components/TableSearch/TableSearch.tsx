import React, { ChangeEvent, useState, MouseEvent } from 'react';
import { ReactComponent as SearchIcon } from '../../assets/icons/search-icon.svg';
import { TableSearchSection } from './styles';

interface ITableSearch {
  disabled: boolean;
  onChangeFilters: (event: any) => void;
  name: string;
  value: string;
  isFiltered: boolean;
}

const TableSearch = ({ onChangeFilters, disabled, name, isFiltered, value }: ITableSearch) => {
  const [currentValue, setCurrentValue] = useState(isFiltered ? value : '');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => setCurrentValue(event.currentTarget.value);

  const handleSearch = async (event: MouseEvent<HTMLButtonElement>) => {
    const searchedName = event.currentTarget.name;
    const searchedValue = event.currentTarget.value;

    const searchData = [
      { currentTarget: { name: 'searchBy', value: searchedName } },
      { currentTarget: { name: 'searchValue', value: searchedValue } },
      { currentTarget: { name: 'page', value: '1' } }
    ]

    await Promise.all(searchData.map(async (item) => onChangeFilters(item)))
  };

  return (
    <TableSearchSection>
      <button
        name={name}
        value={currentValue}
        disabled={disabled || !currentValue.length}
        onClick={(event) => handleSearch(event)}
      >
        <SearchIcon width={20} height={20} />
      </button>
      <input
        type="text"
        name={name}
        placeholder={"Search ..."}
        value={currentValue}
        onChange={onChange}
      />
    </TableSearchSection>
  )
};

export default TableSearch;