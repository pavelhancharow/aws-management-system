import React from 'react';
import { ReactComponent as ClearFilterIcon } from '../../assets/icons/filter-clear-icon.svg';
import { ClearButtonWrap } from './styles';

interface ITableClearButton {
  onClick: () => void;
  disabled: boolean;
}

export const TableClearButton = ({ onClick, disabled }: ITableClearButton) => {
  return (
    <ClearButtonWrap onClick={onClick} disabled={disabled}>
      <ClearFilterIcon width={20} height={20} />

      Clear Filters
    </ClearButtonWrap>
  );
};