import { ReactComponent as PrevIcon } from '../../assets/icons/chevron-left-icon.svg';
import { ReactComponent as NextIcon } from '../../assets/icons/chevron-right-icon.svg';
import { PaginationWrapper } from './styles';

interface IPagination {
  page: number;
  pages: number;
  onClick: (event: any) => void;
  disabled: boolean;
}

const Pagination = ({ page, pages, onClick, disabled }: IPagination) => {
  const renderPageButtons = () => {
    const buttons = [];
    const startPage = Math.max(1, Math.min(page - 2, pages - 4));
    const endPage = Math.min(startPage + 4, pages);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button key={i} className={i === page ? "active" : ""} onClick={() => onClick(i)} disabled={disabled}>
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <PaginationWrapper>
      <button disabled={disabled || page === 1} onClick={() => onClick(page - 1)}>
        <PrevIcon width={20} height={20} />
      </button>
      {renderPageButtons()}
      <button disabled={disabled || pages === page} onClick={() => onClick(page + 1)}>
        <NextIcon width={20} height={20} />
      </button>
    </PaginationWrapper>
  )
};

export default Pagination;