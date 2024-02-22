import { PaginationInfoWrapper } from './styles';

interface IPaginationInfo {
  startCount: number;
  endCount: number;
  totalCount: number;
}

const PaginationInfo = ({ startCount, endCount, totalCount }: IPaginationInfo) => {
  return (
    <PaginationInfoWrapper>
      <span className="currentCount">{startCount} - {endCount}</span> of <span className="totalCount">{totalCount}</span>
    </PaginationInfoWrapper>
  );
};

export default PaginationInfo;