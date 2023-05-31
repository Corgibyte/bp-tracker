import React from 'react';
import type { Measurement } from '~/utils/measurements';

interface Props {
  measurement: Measurement;
}

const MeasurementTag: React.FC<Props> = (props) => {
  const { measurement } = props;

  return (
    <div className='w-1/2 flex items-center justify-between p-2 rounded shadow-inner'>
      <p>{measurement.time.toLocaleTimeString()}</p>
      <div className='flex items-center text-sky-200'>
        <div className='flex flex-col items-center w-max'>
          <p>{measurement.systolic}</p>
          <div className='w-10/12 h-px bg-sky-200' />
          <p>{measurement.diastolic}</p>
        </div>
        <p className='ml-2'>{`${measurement.pulse}`}</p>
      </div>
    </div>
  );
};

export default MeasurementTag;
