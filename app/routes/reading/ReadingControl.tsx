import { useFetcher, useSubmit } from '@remix-run/react';
import React from 'react';
import MeasurementInput from '~/components/MeasurementInput';
import MeasurementTag from '~/components/MeasurementTag';
import type { Measurement } from '~/utils/measurements';
import { IoSave } from 'react-icons/io5';
import Confirmations from './ReadingControl/Confirmations';

interface Props {
  initialReading?: Measurement;
}

const ReadingControl: React.FC<Props> = (props) => {
  const { initialReading } = props;

  const [measurement, setMeasurement] = React.useState<Measurement | undefined>(
    initialReading
  );
  const [confirmations, setConfirmations] = React.useState<Measurement[]>([]);

  const onNewConfirmation = (newMeasurement: Measurement) => {
    setConfirmations([...confirmations, newMeasurement]);
  };

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

  //* Handlers for confirmation actions
  const onCloseConfirmation = (idx: number) => {
    setConfirmations(confirmations.filter((confirm, i) => i !== idx));
  };

  const onPromoteConfirmation = (idx: number) => {
    setMeasurement(confirmations[idx]);
    const newConfirmations = confirmations.filter((confirm, i) => i !== idx);
    setConfirmations([...newConfirmations, measurement!]);
  };

  //* Handler for save action
  const fetcher = useFetcher();

  const onSaveReading = () => {
    if (measurement) {
      fetcher.submit(
        {
          systolic: measurement.systolic.toString(),
          diastolic: measurement.diastolic.toString(),
          pulse: measurement.pulse.toString(),
        },
        { method: 'POST', action: '/reading' }
      );
    }
  };

  return (
    <>
      {measurement ? (
        <>
          <div className='text-lg flex justify-center pt-2 saturate-200'>
            <div className='bg-slate-600 p-2 rounded drop-shadow-md'>
              <MeasurementTag measurement={measurement} />
            </div>
          </div>
          <Confirmations
            confirmations={confirmations}
            onAddConfirmation={onNewConfirmation}
            onCloseConfirmation={onCloseConfirmation}
            onPromoteConfirmation={onPromoteConfirmation}
          />
        </>
      ) : (
        <>
          <form method='get'>
            <MeasurementInput
              onSubmit={onNewMeasurement}
              buttonText='Start new reading...'
            />
          </form>
        </>
      )}
      <div className='flex w-full'>
        <button
          onClick={onSaveReading}
          className='w-full flex bg-emerald-700 hover:bg-emerald-600 rounded py-1 my-1 mr-1 mx-1 text-xl justify-center items-center'
        >
          <span className='mr-2'>
            {fetcher.state !== 'idle' ? (
              <div className='animate-spin h-5 w-5 rounded-full border-2 border-white border-t-transparent' />
            ) : (
              <IoSave />
            )}
          </span>
          Save Reading
        </button>
      </div>
    </>
  );
};

export default ReadingControl;
