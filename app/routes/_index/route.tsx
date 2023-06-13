import type { V2_MetaFunction } from '@remix-run/node';
import { useSubmit } from '@remix-run/react';
import MeasurementInput from '~/components/MeasurementInput';
import type { Measurement } from '~/lib/measurements';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'BP Tracker' }];
};

export default function Index() {
  //* If there is no measurement then we submit GET form
  const submit = useSubmit();

  const onNewMeasurement = (newMeasurement: Measurement) => {
    submit(
      {
        systolic: newMeasurement.systolic.toString(),
        diastolic: newMeasurement.diastolic.toString(),
        pulse: newMeasurement.pulse.toString(),
      },
      {
        action: '/reading',
        method: 'GET',
      }
    );
  };

  return (
    <>
      <form action='/reading' method='GET'>
        <MeasurementInput
          onSubmit={onNewMeasurement}
          buttonText='Start new reading...'
        />
      </form>
    </>
  );
}
