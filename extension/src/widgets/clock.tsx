import {Typography} from '@mui/material';
import {ExpressDate} from 'date-form';
import useDate from '@/hooks/useDate';
import Inputs from '@/components/Inputs';

const dateFormatMap = {
  long: '%ddd, %MMM %D, %YYYY',
  short: '%M/%D/%YY',
  iso: '%YYYY-%MM-%DD',
};

const timeFormatMap = {
  '12': '%hh:%mm',
  '24': '%HH:%mm',
};

const clock: Widget<{
  time: '12' | '24';
  seconds: true;
  date: 'none' | 'long' | 'short' | 'iso';
  format: string;
}> = {
  name: 'Clock',
  help: 'clock',
  defaultData: {time: '12', seconds: true, date: 'short', format: ''},
  exampleData: {time: '12', seconds: true, date: 'short', format: ''},
  defaultGlobalData: {},
  Widget({data}) {
    const date = useDate();

    let format = '';
    if (data.format) {
      format = data.format;
    } else {
      if (data.date !== 'none') {
        format += `${dateFormatMap[data.date]}  `;
      }

      format += timeFormatMap[data.time];
      if (data.seconds) format += ':%ss';
    }

    return (
      <Typography fontSize='1.2rem'>
        {ExpressDate.format(format, date)}
      </Typography>
    );
  },
  Settings({data, setData}) {
    return (
      <>
        <Inputs.Select
          label='Time Display'
          onChange={(newValue) => setData({...data, time: newValue})}
          value={data.time}
          options={{
            '12': '12 Hour',
            '24': '24 Hour',
          }}
        />
        <Inputs.Select
          label='Date Display'
          onChange={(newValue) => setData({...data, date: newValue})}
          value={data.date}
          options={{
            none: 'None',
            long: 'Long',
            short: 'Short',
            iso: 'ISO',
          }}
        />
        <Inputs.Text
          label='Format'
          onChange={(newValue) => setData({...data, format: newValue})}
          value={data.format}
        />
      </>
    );
  },
};

export default clock;
