import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { MouseEvent } from 'react';
import { TooltipPropsIds } from '../../enums';
import { hasFilters } from '../../helpers';
import { TableProps } from '../../models';
import PageLimit from '../PageLimit/PageLimit';
import Pagination from '../Pagination/Pagination';
import PaginationInfo from '../PaginationInfo/PaginationInfo';
import Spinner from '../Spinner/Spinner';
import NoDataPng from '../../assets/images/no-data.png';
import { TableClearButton } from '../TableClearButton/TableClearButton';
import TableFilterButton from '../TableFilterButton/TableFilterButton';
import Tooltip from '../Tooltip/Tooltip';
import {
  ButtonsContainer,
  EmptyDataContent,
  InfoContainer, PaginationBar,
  TableMain,
  TBody,
  TD,
  TH,
  THead,
  ToolBar,
  TR,
} from './styles';

const Table = <T extends object>(
  {
    data,
    columns,
    emptyDataMessage = 'Empty Data',
    renderButtons,
    filters,
    onChangeFilters,
    onChangePagination,
    onClearFilters,
    isLoading,
    pagination,
  }: TableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleOrder = (event: MouseEvent<HTMLButtonElement>) => {
    const order = event.currentTarget.dataset['order'];

    onChangeFilters(event);
    onChangeFilters({currentTarget: {name: 'order', value: order === 'asc' ? 'desc' : 'asc' }});
  }

  const renderTBody = () => {
    if (isLoading) {
      return <Spinner isLoading={isLoading} />
    }

    if (!data.length) {
      return (
        <EmptyDataContent>
          <img src={NoDataPng} alt={emptyDataMessage} />
          <span>{emptyDataMessage}</span>
        </EmptyDataContent>
      );
    }

    return (
      <>
        {table.getRowModel().rows.map((row) => (
          <TR key={row.id} hover="true">
            {row.getVisibleCells().map((cell) => (
              <TD key={cell.id}>
                <div>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
              </TD>
            ))}
          </TR>
        ))}
      </>
    );
  };

  return (
    <>
      <TableMain>
        <ToolBar>
          <InfoContainer>
            <TableClearButton onClick={onClearFilters} disabled={isLoading || hasFilters(filters, { page: '1', limit: '25', order: 'asc' })} />
          </InfoContainer>
          {renderButtons && <ButtonsContainer>{renderButtons}</ButtonsContainer>}
        </ToolBar>
        <THead>
        {table.getHeaderGroups().map((headerGroup) => {

          return (
            <TR key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TH key={header.id} order={header.column.columnDef.meta?.sortable && filters?.order} >
                  <button
                    onClick={handleOrder}
                    name="orderBy"
                    value={header.id}
                    disabled={!header.column.columnDef.meta?.sortable}
                    data-tooltip-id={TooltipPropsIds.TableOrderButton}
                    data-tooltip-content={`order by ${header.id}`}
                    data-active={filters?.orderBy === header.id}
                    data-order={filters?.order}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    <Tooltip id={TooltipPropsIds.TableOrderButton} />
                  </button>

                  {header.column.columnDef.meta?.filterable && (
                    <TableFilterButton
                      name={header.id}
                      value={filters?.searchValue || ''}
                      onChangeFilters={onChangeFilters}
                      isLoading={isLoading}
                      isFiltered={filters?.searchBy === header.id}
                    />
                  )}
                </TH>
              ))}
            </TR>
          );
        })}
        </THead>
        <TBody center={`${isLoading || !data.length}`}>
          {renderTBody()}
        </TBody>
      </TableMain>

      {pagination.totalCount > 0 && (
        <PaginationBar>
          <InfoContainer>
            <PaginationInfo
              startCount={pagination.startCount}
              endCount={pagination.endCount}
              totalCount={pagination.totalCount}
            />
            <PageLimit limit={filters.limit} onChange={onChangeFilters} disabled={isLoading} />
          </InfoContainer>
          <ButtonsContainer>
            <Pagination page={pagination.page} pages={pagination.pages} onClick={onChangePagination} disabled={isLoading} />
          </ButtonsContainer>
        </PaginationBar>
      )}
    </>
  );
};

export default Table;
