import React, { useState, useRef } from 'react';
import { useOutside } from '../../hooks';
import { TableFilterButtonWrap, TableFilterModal } from './styles';
import TableSearch from '../TableSearch/TableSearch';
import {ReactComponent as FilterIcon} from '../../assets/icons/filter-icon.svg';

interface ITableFilterButton {
  name: string;
  value: string;
  onChangeFilters: (event: any) => void;
  isLoading: boolean;
  isFiltered: boolean;
}

export const TableFilterButton = ({ name, value, onChangeFilters, isLoading, isFiltered }: ITableFilterButton) => {
  const [open, setOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useOutside(filterRef, open, handleClose);

  return (
    <TableFilterButtonWrap onClick={handleOpen} open={open || isFiltered}>
      <FilterIcon width={20} height={20} />

      {open && (
        <TableFilterModal ref={filterRef}>
          <TableSearch
            onChangeFilters={onChangeFilters}
            disabled={isLoading}
            name={name}
            value={value}
            isFiltered={isFiltered}
          />
        </TableFilterModal>
      )}
    </TableFilterButtonWrap>
  )
};

export default TableFilterButton;