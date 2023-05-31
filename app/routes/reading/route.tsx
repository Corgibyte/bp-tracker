import { json } from '@remix-run/node';
import type { LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React from 'react';
import ReadingControl from './ReadingControl';
import { parseMeasurement } from '~/utils/measurements';

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const systolic = parseMeasurement(url.searchParams.get('systolic'));
  const diastolic = parseMeasurement(url.searchParams.get('diastolic'));
  const pulse = parseMeasurement(url.searchParams.get('pulse'));
  if (systolic === null || diastolic === null || pulse === null) {
    return json({ measurement: null });
  } else {
    return json({
      measurement: {
        systolic,
        diastolic,
        pulse,
      },
    });
  }
};

const ReadingRoute: React.FC = () => {
  const data = useLoaderData<typeof loader>();
  const time = new Date();

  return (
    <>
      <h2 className='text-2xl font-semibold text-orange-500 text-center'>
        New Reading
      </h2>
      <ReadingControl
        initialReading={
          data.measurement ? { ...data.measurement, time } : undefined
        }
      />
    </>
  );
};

export default ReadingRoute;
