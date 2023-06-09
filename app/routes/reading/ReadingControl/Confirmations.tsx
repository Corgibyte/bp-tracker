import React from 'react';
import type { Measurement } from '~/lib/measurements';
import ConfirmationLine from './ConfirmationLine';
import MeasurementInput from '~/components/MeasurementInput';
import { a, useSpring } from '@react-spring/web';
import useMeasure from 'react-use-measure';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { Tooltip } from 'react-tooltip';
import { confirmationTooltipContent } from '~/lib/content';

interface Props {
  confirmations: Measurement[];
  onCloseConfirmation: (idx: number) => void;
  onPromoteConfirmation: (idx: number) => void;
  onAddConfirmation: (newConfirmation: Measurement) => void;
}

const Confirmations: React.FC<Props> = (props) => {
  const {
    confirmations,
    onCloseConfirmation,
    onPromoteConfirmation,
    onAddConfirmation,
  } = props;

  const [isAdding, setIsAdding] = React.useState(false);

  //* Spring for animating collapse
  const [ref, { height: viewHeight }] = useMeasure();

  const { opacity, height } = useSpring({
    from: { opacity: 0, height: 0 },
    to: {
      opacity: isAdding ? 1 : 0,
      height: isAdding ? viewHeight : 0,
    },
    config: {
      friction: 30,
      mass: 4,
    },
  });

  const focusRef = React.useRef<HTMLInputElement | null>(null);

  const handleAdd = () => {
    setIsAdding(!isAdding);
    if (!isAdding && focusRef?.current) {
      focusRef.current.focus();
    }
  };

  return (
    <div className='mt-4 bg-zinc-800 m-1 p-1 rounded-sm'>
      <h2 className='font-semibold text-xl text-center text-neutral-200'>
        <span className='inline-flex items-center'>
          CONFIRMATIONS
          <span
            className='inline-flex ml-1 pt-px'
            data-tooltip-content={confirmationTooltipContent}
            data-tooltip-id='confirmation-tooltip'
          >
            <IoInformationCircleOutline />
          </span>
        </span>
      </h2>
      <Tooltip id='confirmation-tooltip' className='tooltip' />
      <hr className='border-neutral-600' />
      {confirmations.length === 0 ? (
        <>
          <p className='text-rose-500 font-semibold py-2 saturate-150 text-center'>
            NO CONFIRMATIONS
          </p>
        </>
      ) : (
        <>
          {confirmations.map((confirmation, idx) => (
            <React.Fragment key={idx}>
              <ConfirmationLine
                measurement={confirmation}
                onClose={() => onCloseConfirmation(idx)}
                onPromote={() => onPromoteConfirmation(idx)}
              />
              <hr className='border-zinc-500' />
            </React.Fragment>
          ))}
        </>
      )}
      <button
        className={`text-slate-100 p-1 bg-zinc-600 hover:border-neutral-300 border-b-2 border-b-transparent ${
          isAdding ? 'rounded-t' : 'rounded mb-1'
        } rounded-t mt-1`}
        onClick={handleAdd}
      >
        {isAdding ? 'Cancel' : 'Add Confirmation'}
      </button>
      <a.div
        style={{ opacity, height: isAdding ? 'auto' : height }}
        className={`${isAdding ? 'pb-2' : ''} drop-shadow-lg bg-zinc-600`}
        ref={ref}
      >
        {isAdding ? (
          <MeasurementInput
            onSubmit={(newConfirmation: Measurement) => {
              onAddConfirmation(newConfirmation);
              setIsAdding(false);
            }}
            buttonText='Add confirmation'
            focusRef={focusRef}
          />
        ) : null}
      </a.div>
    </div>
  );
};

export default Confirmations;
