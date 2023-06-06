export type Measurement = {
  systolic: number;
  diastolic: number;
  pulse: number;
};

export function parseMeasurement(measurement: string | null) {
  if (measurement === null) {
    return null;
  }
  const intValue = parseInt(measurement);
  return isNaN(intValue) ? null : intValue;
}

interface MeasurementInput {
  systolic: string;
  diastolic: string;
  pulse: string;
}

export function validateMeasurement(input: MeasurementInput) {
  const systolic = parseMeasurement(input.systolic);
  const diastolic = parseMeasurement(input.diastolic);
  const pulse = parseMeasurement(input.pulse);
  const valid = systolic !== null && diastolic !== null && pulse !== null;
  return valid;
}

export function parseMeasurementInput(input: MeasurementInput): Measurement {
  const systolic = parseMeasurement(input.systolic);
  const diastolic = parseMeasurement(input.diastolic);
  const pulse = parseMeasurement(input.pulse);
  const valid = systolic !== null && diastolic !== null && pulse !== null;
  if (!valid) {
    throw 'Illegal input';
  }
  return {
    systolic,
    diastolic,
    pulse,
  };
}
