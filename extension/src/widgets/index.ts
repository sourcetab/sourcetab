import clock from './clock';
import iframe from './iframe';
import link from './link';
import note from './note';

const widgets: Record<string, Widget<any, any>> = {
  clock,
  iframe,
  link,
  note,
};

export default widgets;
