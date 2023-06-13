import React from 'react';
import { parseMeasurementInput, validateMeasurement } from '~/lib/measurements';
import type { Measurement } from '~/lib/measurements';

const inputStyles =
  'w-10/12 shadow-inner h-12 px-3 bg-sky-700 focus:ring focus:ring-orange-600 focus:outline-0 focus:border-0 rounded-lg text-center';

const onChangeValidation = (stringValue: string) => {
  if (stringValue === '') {
    return '';
  }
  const testRegex = /\D/;
  return testRegex.test(stringValue) ? undefined : stringValue.slice(0, 3);
};

interface Props {
  onSubmit: (newMeasurement: Measurement) => void;
  buttonText: string;
  focusRef?: React.MutableRefObject<HTMLInputElement | null>;
}

interface Values {
  systolic: string;
  diastolic: string;
  pulse: string;
}

const MeasurementInput: React.FC<Props> = (props: Props) => {
  const { onSubmit, buttonText, focusRef } = props;

  //* Always control value for ensuring only appropriate digits used
  const [values, setValues] = React.useState<Values>({
    systolic: '',
    diastolic: '',
    pulse: '',
  });

  const submitHandler = () => {
    if (validateMeasurement(values)) {
      setValues({
        systolic: '',
        diastolic: '',
        pulse: '',
      });
      onSubmit(parseMeasurementInput(values));
    }
  };

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === 'Enter' && validateMeasurement(values)) {
          submitHandler();
        }
      }}
    >
      <div className='grid grid-cols-3 justify-items-center py-4'>
        <input
          type='text'
          name='systolic'
          value={values.systolic}
          onChange={(e) => {
            setValues({
              ...values,
              systolic: onChangeValidation(e.target.value) ?? values.systolic,
            });
          }}
          className={inputStyles}
          required
          ref={focusRef}
          autoFocus
        />
        <input
          type='text'
          name='diastolic'
          value={values.diastolic}
          onChange={(e) => {
            setValues({
              ...values,
              diastolic: onChangeValidation(e.target.value) ?? values.diastolic,
            });
          }}
          className={inputStyles}
          required
        />
        <input
          type='text'
          name='pulse'
          value={values.pulse}
          onChange={(e) => {
            setValues({
              ...values,
              pulse: onChangeValidation(e.target.value) ?? values.pulse,
            });
          }}
          className={inputStyles}
          required
        />
      </div>
      <div className='px-6 flex'>
        <button
          className='w-full h-8 mx:auto rounded bg-orange-400 disabled:bg-orange-800 text-lg text-black disabled:cursor-not-allowed'
          disabled={!validateMeasurement(values)}
          onClick={submitHandler}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default MeasurementInput;
