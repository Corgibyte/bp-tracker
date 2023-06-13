import { Notice } from '~/routes/reading/ReadingControl/ConfirmationNotices';
import { confirmationTooltipContent } from './content';

export type Measurement = {
  systolic: number;
  diastolic: number;
  pulse: number;
};

export type Reading = Measurement & {
  time: string;
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

export function doComparison(
  measurement: Measurement,
  confirmations: Measurement[]
): Notice[] {
  const notices: Notice[] = [];
  if (confirmations.length === 0) {
    notices.push({
      title: 'No confirmations',
      tooltip: confirmationTooltipContent,
    });
  }
  for (let i = 0; i < confirmations.length; i++) {
    const SYSTOLIC_ADJUSTMENT = 0.1 * measurement.systolic;
    const DIASTOLIC_ADJUSTMENT = 0.1 * measurement.diastolic;
    const PULSE_ADJUSTMENT = 0.1 * measurement.pulse;
    if (
      confirmations[i].systolic < measurement.systolic - SYSTOLIC_ADJUSTMENT ||
      confirmations[i].systolic > measurement.systolic + SYSTOLIC_ADJUSTMENT
    ) {
      notices.push({
        title: `Confirmation ${i + 1} is out of SYSTOLIC range.`,
      });
    }
    if (
      confirmations[i].diastolic <
        measurement.diastolic - DIASTOLIC_ADJUSTMENT ||
      confirmations[i].diastolic > measurement.diastolic + DIASTOLIC_ADJUSTMENT
    ) {
      notices.push({
        title: `Confirmation ${i + 1} is out of DIASTOLIC range.`,
      });
    }
    if (
      confirmations[i].pulse < measurement.pulse - PULSE_ADJUSTMENT ||
      confirmations[i].pulse > measurement.pulse + PULSE_ADJUSTMENT
    ) {
      notices.push({
        title: `Confirmation ${i + 1} is out of PULSE range.`,
      });
    }
  }
  return notices;
}
