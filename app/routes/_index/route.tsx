import type { V2_MetaFunction } from '@remix-run/node';
import MeasurementInput from '~/components/MeasurementInput';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'BP Tracker' }];
};

export default function Index() {
  return (
    <>
      <form method='GET' action='/reading'>
        <MeasurementInput />
      </form>
    </>
  );
}
