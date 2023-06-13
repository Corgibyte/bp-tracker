import React from 'react';
import type { Measurement } from '~/lib/measurements';

interface Props {
  measurement: Measurement;
}

const MeasurementTag: React.FC<Props> = (props) => {
  const { measurement } = props;

  return (
    <div className='text-sky-400 flex'>
      <p className='font-bold mr-1'>BP:</p>
      <p>{`${measurement.systolic.toString()} / ${measurement.diastolic.toString()}`}</p>
      <p className='font-bold mr-1 ml-3'>Pulse:</p>
      <p>{`${measurement.pulse}`}</p>
    </div>
  );
};

export default MeasurementTag;
