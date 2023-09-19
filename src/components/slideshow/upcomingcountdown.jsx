import React, { useState, useEffect } from 'react';
import moment from 'moment';

function UpcomingCountdown({ endDate }) {
  const [countdown, setCountdown] = useState(calculateCountdown());

  function calculateCountdown() {
    const now = moment();
    const end = moment(endDate * 1000); // Convert to milliseconds
    const duration = moment.duration(end.diff(now));
    return duration;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="w-12 rounded-lg bg-white bg-opacity-40 py-3 text-gray-700">
        {countdown.days()}d
      </div>
      <div className="w-12 rounded-lg bg-white bg-opacity-40 py-3 text-gray-700">
        {countdown.hours()}h
      </div>
      <div className="w-12 rounded-lg bg-white bg-opacity-40 py-3 text-gray-700">
        {countdown.minutes()}m
      </div>
      <div className="w-12 rounded-lg bg-white bg-opacity-40 py-3 text-gray-700">
        {countdown.seconds()}s
      </div>
    </>
  );
}

export default UpcomingCountdown;
