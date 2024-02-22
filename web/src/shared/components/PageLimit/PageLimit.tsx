import React from 'react';
import { PageLimitWrapper } from './styles';

interface IPageLimit {
  limit: string;
  onChange: (event: any) => void;
  disabled: boolean;
}

const PageLimit = ({ limit, onChange, disabled }: IPageLimit) => {
  return (
    <PageLimitWrapper>
      per Page {' '}
      <select name="limit" value={limit} onChange={onChange} disabled={disabled}>
        <option value="5">5</option>
        <option value="15">15</option>
        <option value="25">25</option>
      </select>
    </PageLimitWrapper>
  )
}

export default PageLimit;