import { a, useSpring } from '@react-spring/web';
import React from 'react';
import { IoMdArrowRoundUp } from 'react-icons/io';
import { IoCloseSharp } from 'react-icons/io5';
import MeasurementTag from '~/components/MeasurementTag';
import type { Measurement } from '~/utils/measurements';

interface Props {
  measurement: Measurement;
  onPromote: () => void;
  onClose: () => void;
}

const ConfirmationLine: React.FC<Props> = (props) => {
  const { measurement, onPromote, onClose } = props;

  const { opacity } = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { mass: 5, friction: 40 },
  });

  return (
    <a.div
      style={{ opacity }}
      className='flex w-full justify-between px-2 bg-neutral-700 items-center shadow-inner'
    >
      <MeasurementTag measurement={measurement} />
      <div>
        <button
          className='hover:ring hover:ring-neutral-400 m-2'
          onClick={onPromote}
        >
          <IoMdArrowRoundUp />
        </button>
        <button
          className='hover:ring hover:ring-neutral-400 m-2'
          onClick={onClose}
        >
          <IoCloseSharp />
        </button>
      </div>
    </a.div>
  );
};

export default ConfirmationLine;
