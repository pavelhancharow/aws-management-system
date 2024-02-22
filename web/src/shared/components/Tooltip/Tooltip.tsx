import { useMemo } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import "react-tooltip/dist/react-tooltip.css";
import { TooltipPropsIds } from '../../enums';
import { TooltipPropsById } from './constants';

interface ITooltip {
  id: TooltipPropsIds;
}

const Tooltip = ({ id }: ITooltip) => {
  const tooltipProps = useMemo(() => TooltipPropsById[id], [id])

  return <ReactTooltip id={id} {...tooltipProps}  />
}

export default Tooltip