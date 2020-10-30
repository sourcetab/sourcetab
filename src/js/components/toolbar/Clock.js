import React, { useState, useEffect } from 'react';
import useStorage from '../../hooks/useStorage';

const zero = i => {
  return i < 10 ? `0${i}` : i;
};

export default function Clock() {
  const [time, setTime] = useState('');
  const [config] = useStorage('clockConfig', {
    render: true,
    renderSeconds: true,
    twentyFourHourFormat: false,
  });

  const tick = () => {
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

  useEffect(() => {
    const interval = setInterval(() => tick(), 1000);
    tick();
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span>{time}</span>;
}
