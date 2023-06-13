import React from 'react';

import NoticeLine from './NoticeLine';

export interface Notice {
  title: string;
  tooltip?: string;
}

interface Props {
  notices: Notice[];
}

const ConfirmationNotices: React.FC<Props> = (props) => {
  const { notices } = props;

  return (
    <div
      className='p-1 m-1 rounded bg-zinc-700'
      style={{
        boxShadow:
          'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px',
      }}
    >
      {notices.map((notice, idx) => (
        <React.Fragment key={idx}>
          <NoticeLine notice={notice} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default ConfirmationNotices;
