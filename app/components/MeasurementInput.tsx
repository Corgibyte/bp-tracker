import React from 'react';
import {
  parseMeasurementInput,
  validateMeasurement,
} from '~/utils/measurements';
import type { Measurement } from '~/utils/measurements';

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
}

interface Values {
  systolic: string;
  diastolic: string;
  pulse: string;
}

const MeasurementInput: React.FC<Props> = (props: Props) => {
  const { onSubmit } = props;

  //* Always control value for ensuring only appropriate digits used
  const [values, setValues] = React.useState<Values>({
    systolic: '',
    diastolic: '',
    pulse: '',
  });

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === 'Enter' && validateMeasurement(values)) {
          onSubmit(parseMeasurementInput(values));
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
          onClick={() => {
            if (validateMeasurement(values)) {
              onSubmit(parseMeasurementInput(values));
            }
          }}
        >
          {`Take reading`}
        </button>
      </div>
    </div>
  );
};

export default MeasurementInput;
