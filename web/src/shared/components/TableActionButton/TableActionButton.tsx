import { ReactNode } from 'react';
import { TooltipPropsIds } from '../../enums';
import Tooltip from '../Tooltip/Tooltip';
import { TableActionBtn } from './styles';

interface ITableActionButton {
  children: ReactNode;
  onClick: () => void;
  title: string;
  disabled: boolean;
}

const TableActionButton = ({ children, onClick, title, disabled }: ITableActionButton) => {
  return (
    <TableActionBtn
      onClick={onClick}
      data-tooltip-id={TooltipPropsIds.TableActionButton}
      data-tooltip-content={title}
      disabled={disabled}
    >
      {children}
      <Tooltip id={TooltipPropsIds.TableActionButton} />
    </TableActionBtn>
  );
};

export default TableActionButton;