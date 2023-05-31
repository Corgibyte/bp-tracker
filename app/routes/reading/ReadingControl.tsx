import React from 'react';
import MeasurementInput from '~/components/MeasurementInput';
import MeasurementTag from '~/components/MeasurementTag';
import type { Measurement } from '~/utils/measurements';

interface Props {
  initialReading?: Measurement;
}

const ReadingControl: React.FC<Props> = (props) => {
  const { initialReading } = props;

  const [measurement, setMeasurement] = React.useState<Measurement | undefined>(
    initialReading
  );

  return (
    <>
      {measurement ? (
        <MeasurementTag measurement={measurement} />
      ) : (
        <>
          <MeasurementInput />
        </>
      )}
    </>
  );
};

export default ReadingControl;
