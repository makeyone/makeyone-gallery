/* eslint-disable prefer-destructuring */

'use client';

import moment from 'moment-timezone';

interface DateToStringProps {
  dateString: string;
  addYear?: boolean;
  addTime?: boolean;
}

export default ({ dateString, addYear = true, addTime = false }: DateToStringProps): string => {
  let result: string = '';
  result = moment.tz(dateString).format(addYear === true ? 'YYYY.MM.DD, HH:mm:ss' : 'MM.DD, HH:mm:ss');

  if (addTime === false) {
    result = result.split(',')[0];
  }

  return result;
};
