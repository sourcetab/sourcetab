import {utcToZonedTime} from 'date-fns-tz';
import {useContext} from 'react';

import {dateContext} from './dateContext';

export default function useDate(tz = ''): Date {
  const date = useContext(dateContext);

  return tz ? utcToZonedTime(date, tz) : date;
}
