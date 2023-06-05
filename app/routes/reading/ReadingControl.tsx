import { useSubmit } from '@remix-run/react';
import React from 'react';
import MeasurementInput from '~/components/MeasurementInput';
import MeasurementTag from '~/components/MeasurementTag';
import type { Measurement } from '~/utils/measurements';
import ConfirmationLine from './ReadingControl/ConfirmationLine';
import { IoSave } from 'react-icons/io5';

interface Props {
  initialReading?: Measurement;
}

const ReadingControl: React.FC<Props> = (props) => {
  const { initialReading } = props;

  const [measurement, setMeasurement] = React.useState<Measurement | undefined>(
    initialReading
  );
  const [confirmations, setConfirmations] = React.useState<Measurement[]>([]);
  const [isAddingConfirm, setIsAddingConfirm] = React.useState(false);

  const onNewConfirmation = (newMeasurement: Measurement) => {
    setConfirmations([...confirmations, newMeasurement]);
    setIsAddingConfirm(false);
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
  const onSaveReading = () => {
    //TODO
    console.log('TODO: Save reading');
  };

  return (
    <>
      {measurement ? (
        <div className=''>
          <div className='text-lg flex justify-center pt-2 saturate-200'>
            <div className='bg-slate-600 p-2 rounded drop-shadow-md'>
              <MeasurementTag measurement={measurement} />
            </div>
          </div>
          <div className='mt-4 bg-slate-900 '>
            {confirmations.length === 0 ? (
              <>
                <p className='text-rose-500 font-semibold py-2 saturate-150 text-center'>
                  NO CONFIRMATIONS
                </p>
              </>
            ) : (
              <>
                <h2 className='text-center'>CONFIRMATIONS</h2>
                <hr className='border-zinc-500' />
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
              className='text-slate-100 p-1 bg-rose-600 hover:bg-rose-700 rounded m-1'
              onClick={() => setIsAddingConfirm(!isAddingConfirm)}
            >
              {isAddingConfirm ? 'Cancel' : 'Add Confirmation'}
            </button>
            {isAddingConfirm ? (
              <div className='pb-1'>
                <MeasurementInput onSubmit={onNewConfirmation} />
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <>
          <form method='get'>
            <MeasurementInput onSubmit={onNewMeasurement} />
          </form>
        </>
      )}
      <div className='flex w-full'>
        <button
          onClick={onSaveReading}
          className='flex ml-auto bg-emerald-700 hover:bg-emerald-600 rounded my-1 mr-1 px-1 text-lg items-center'
        >
          <IoSave />
          <p className='pl-1.5'>Save Reading</p>
        </button>
      </div>
    </>
  );
};

export default ReadingControl;
