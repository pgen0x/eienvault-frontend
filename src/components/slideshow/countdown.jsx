import moment from 'moment';
import { useEffect, useState } from 'react';

function LiveCountdown({ endDate }) {
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

  return `${countdown.days()}d ${countdown.hours()}h ${countdown.minutes()}m ${countdown.seconds()}s`;
}

export default LiveCountdown;
