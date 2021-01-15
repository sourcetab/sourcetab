import { useState, useEffect } from 'react';
import useStorage from '../../hooks/useStorage';

const zero = i => (i < 10 ? `0${i}` : i);

export default function Clock() {
  const [time, setTime] = useState('');
  const [data] = useStorage();

  const tick = config => {
    const date = new Date();
    let h = date.getHours();
    h -= !config.twentyFourHourFormat && h > 12 ? 12 : 0;
    const m = zero(date.getMinutes());
    const s = zero(date.getSeconds());
    const g = ' : ';
    setTime(
      config.render ? h + g + m + (config.renderSeconds ? g + s : '') : ''
    );
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (data.clock.render) {
      const interval = setInterval(() => tick(data.clock), 1000);
      tick(data.clock);
      return () => {
        clearInterval(interval);
      };
      // eslint-disable-next-line no-else-return
    } else {
      setTime('');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.clock]);

  return <span>{time}</span>;
}
