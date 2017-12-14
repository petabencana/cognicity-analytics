import { Injectable } from '@angular/core';

@Injectable()
export class TimeService {

  constructor() { }

  // Get date in YYYY-MM-DD format
  // Return start & end dates, 7 days apart
  // in ISO 8601 format string
  format(selectedDate) {
    // Store as [YYYY, MM, DD]
    const dateValues = selectedDate.split('-', 3);

    // Generate number in milliseconds since 1 Jan 1970 00:00:00 UTC
    const dateMilliseconds = Date.parse((new Date(
      dateValues[0],
      parseInt(dateValues[1], 10) - 1, // Count months from 0
      dateValues[2],
    )).toString());

    // Start and end dateTime in milliseconds, 7 days apart
    const startMilliseconds = dateMilliseconds - (3 * 24 * 60 * 60 * 1000);
    const endMilliseconds = dateMilliseconds + (4 * 24 * 60 * 60 * 1000) - 1;

    // Generate ISO 8601 strings,
    // after generating UTC string to add time zone
    const startDatetime = (new Date(
      (new Date(startMilliseconds)).toUTCString()
    )).toISOString().replace('.', '%2B');
    const endDatetime = (new Date(
      (new Date(endMilliseconds)).toUTCString()
    )).toISOString().replace('.', '%2B');

    return {
      start: startDatetime.replace('Z', '0'),
      end: endDatetime.replace('Z', '0')
    };
  }

  getKnobDateTime(range, startDate) {
    const steps = range.totalDays * (24 / range.intervalHours);
    const millisecondsPerStep = range.intervalHours * 60 * 60 * 1000;
    const startMilliseconds = Date.parse((new Date(startDate.replace('%2B', '.'))).toString());
    const monthMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const knobPosition = [];

    for (let step = 0; step <= steps; step++) {
      const dateTime = new Date(startMilliseconds + (millisecondsPerStep * step));

      knobPosition.push({
        date: dateTime.getDate(),
        month: monthMap[dateTime.getMonth()],
        time: (dateTime.getHours() < 10 ? '0' + dateTime.getHours() : dateTime.getHours())
        + ':'
        + (dateTime.getMinutes() < 10 ? '0' + dateTime.getMinutes() : dateTime.getMinutes())
      });
    }

    return knobPosition;
  }
}