import { useState, useEffect } from 'react';
import useStorage from '../../hooks/useStorage';

const zero = i => {
  return i < 10 ? `0${i}` : i;
};

export default function Clock() {
  const [time, setTime] = useState('');
  const [clockConfig] = useStorage('clockConfig', {
    render: true,
    renderSeconds: true,
    twentyFourHourFormat: false,
  });

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
    if (clockConfig.render) {
      const interval = setInterval(() => tick(clockConfig), 1000);
      tick(clockConfig);
      return () => {
        clearInterval(interval);
      };
      // eslint-disable-next-line no-else-return
    } else {
      setTime('');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clockConfig]);

  return <span>{time}</span>;
}
