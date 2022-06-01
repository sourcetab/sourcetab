import clock from './clock';
import link from './link';

const widgets: Record<string, Widget<any, any>> = {
  clock,
  link,
};

export default widgets;
