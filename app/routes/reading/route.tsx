import { ActionArgs, redirect } from '@remix-run/node';
import { json, Response } from '@remix-run/node';
import type { LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React from 'react';
import ReadingControl from './ReadingControl';
import { parseMeasurement, parseMeasurementInput } from '~/lib/measurements';
import type { Measurement, Reading } from '~/lib/measurements';
import { db } from '~/lib/db.server';

interface LoaderData {
  measurement: Measurement | null;
  readings?: Reading[];
}

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const systolic = parseMeasurement(url.searchParams.get('systolic'));
  const diastolic = parseMeasurement(url.searchParams.get('diastolic'));
  const pulse = parseMeasurement(url.searchParams.get('pulse'));
  if (systolic === null || diastolic === null || pulse === null) {
    const data: LoaderData = { measurement: null };
    return json(data);
  } else {
    const readings = await db.measurement.findMany();
    const data: LoaderData = {
      measurement: {
        systolic,
        diastolic,
        pulse,
      },
      readings: readings.map((reading) => ({
        ...reading,
        time: reading.created.toLocaleString(),
      })),
    };
    return json(data);
  }
};

export const action = async ({ params, request }: ActionArgs) => {
  const formData = await request.formData();
  const systolic = formData.get('systolic');
  const diastolic = formData.get('diastolic');
  const pulse = formData.get('pulse');
  if (systolic === null || diastolic === null || pulse === null) {
    return json(null);
  }
  try {
    const measurement = parseMeasurementInput({
      systolic: systolic.toString(),
      diastolic: diastolic.toString(),
      pulse: pulse.toString(),
    });
    await db.measurement.create({
      data: {
        systolic: measurement.systolic,
        diastolic: measurement.diastolic,
        pulse: measurement.pulse,
      },
    });
    return redirect('/');
  } catch {
    throw new Response(null, { status: 400, statusText: 'Bad Request' });
  }
};

const ReadingRoute: React.FC = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <h2 className='text-2xl font-semibold text-orange-500 text-center'>
        New Reading
      </h2>
      <ReadingControl
        initialReading={data.measurement ? { ...data.measurement } : undefined}
      />
    </>
  );
};

export default ReadingRoute;
