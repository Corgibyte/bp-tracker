import React from 'react';
import type { Notice } from './ConfirmationNotices';
import { IoWarning } from 'react-icons/io5';
import { Tooltip } from 'react-tooltip';
import { a, useSpring } from '@react-spring/web';

interface Props {
  notice: Notice;
}

const NoticeLine: React.FC<Props> = (props) => {
  const { notice } = props;

  //* Spring function
  const { opacity } = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { mass: 5, friction: 40 },
  });

  return (
    <a.div style={{ opacity }}>
      <div className='flex w-full items-center text-rose-500 text-lg'>
        <IoWarning />
        <p
          className='font-semibold ml-1'
          data-tooltip-id='notice-tooltip'
          data-tooltip-content={notice.tooltip}
          data-tooltip-place='right'
        >
          {notice.title}
        </p>
      </div>
      <div className='base'>
        <Tooltip id='notice-tooltip' className='tooltip' />
      </div>
    </a.div>
  );
};

export default NoticeLine;
