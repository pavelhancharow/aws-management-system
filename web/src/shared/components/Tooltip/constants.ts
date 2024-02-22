import { ITooltip } from 'react-tooltip';
import { globalColors } from '../../../styles';
import { TooltipPropsIds } from '../../enums';

export const TooltipPropsById = {
  [TooltipPropsIds.TableActionButton]: {
    style: {
      backgroundColor: globalColors.olympicBlue,
      borderRadius: '8px',
    },
    place: 'bottom',
  },
  [TooltipPropsIds.TableOrderButton]: {
    style: {
      backgroundColor: globalColors.olympicBlue,
      borderRadius: '8px',
    },
    place: 'bottom',
  },
  [TooltipPropsIds.NavLogoutButton]: {
    style: {
      backgroundColor: globalColors.olympicBlue,
      borderRadius: '8px',
    },
    place: 'bottom',
    opacity: 0.9
  }
} as { [key in TooltipPropsIds]: ITooltip }