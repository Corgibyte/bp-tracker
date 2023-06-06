import React from 'react';
import type { Reading } from '~/utils/measurements';
import MeasurementTag from '../MeasurementTag';

interface Props {
  readings: Reading[];
}

const PastReadings: React.FC<Props> = (props) => {
  const { readings } = props;

  return (
    <div>
      <h1 className='text-center font-semibold text-orange-500'>
        PREVIOUS READINGS
      </h1>
      {readings.map((reading, idx) => (
        <div
          className={`flex w-full justify-between px-2 ${
            idx % 2 === 0 ? 'bg-neutral-600' : 'bg-neutral-700'
          }`}
          key={idx}
        >
          <p>{reading.time}</p>
          <MeasurementTag measurement={reading} />
        </div>
      ))}
    </div>
  );
};

export default PastReadings;
