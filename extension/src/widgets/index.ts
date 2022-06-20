import clock from './clock';
import link from './link';
import note from './note';

const widgets: Record<string, Widget<any, any>> = {
  clock,
  link,
  note,
};

export default widgets;
