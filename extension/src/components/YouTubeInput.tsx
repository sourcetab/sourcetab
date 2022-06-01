import {OutlinedInput} from '@mui/material';
import {useEffect, useRef, useState} from 'react';

import Inputs from '@/components/Inputs';

const youtubeFindRegex =
  /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?vi?=|&vi?=))([^#&?]*).*/;
const youtubeIdRegex = /([^#&?]*)/;

const YouTubeInput: FC<{
  value: string;
  onChange: (newValue: string) => void;
}> = ({value, onChange}) => {
  const [text, setText] = useState(value);

  useEffect(() => {
    if (text !== value) setText(value);
  }, [value]);

  const textFieldRef = useRef<HTMLInputElement>();

  return (
    <Inputs.Base
      label='ID'
      onClick={() => textFieldRef.current?.focus()}
      sx={{pr: '243px !important'}}
    >
      <OutlinedInput
        inputProps={{ref: textFieldRef}}
        onChange={(e) => setText(e.target.value)}
        size='small'
        sx={{mr: '-8px'}}
        value={text}
        onBlur={() => {
          const newValue = (
            youtubeFindRegex.exec(text)?.[1] ||
            youtubeIdRegex.exec(text)?.[1] ||
            ''
          ).trim();
          setText(newValue);
          onChange(newValue);
        }}
      />
    </Inputs.Base>
  );
};

export default YouTubeInput;
