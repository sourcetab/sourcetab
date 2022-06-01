import {createContext, useEffect, useState} from 'react';

export const dateContext = createContext(new Date());

export const DateContextProvider: FC = ({children}) => {
  const [date, setDate] = useState(() => new Date());

  useEffect(() => {
    let animationFrame: number;
    const frame = () => {
      setDate(new Date());
      animationFrame = requestAnimationFrame(frame);
    };
    animationFrame = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animationFrame);
  }, []);
  return <dateContext.Provider value={date}>{children}</dateContext.Provider>;
};
