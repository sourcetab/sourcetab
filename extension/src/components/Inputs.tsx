import {FileUpload as FileUploadIcon} from '@mui/icons-material';
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemButtonProps,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select as MuiSelect,
  Slider,
  Stack,
  Switch as MuiSwitch,
} from '@mui/material';
import {useEffect, useRef, useState} from 'react';

import {WritableDraft} from 'immer/dist/internal';
import useStorage from '@/hooks/useStorage';
import {clamp, uploadFile} from '@/utils';

import ColorPicker from './ColorPicker';
import {SimpleIconsPicker} from './SimpleIcons';

const BaseInput: FC<{label: React.ReactNode} & ListItemButtonProps> = ({
  label,
  children,
  ...props
}) => (
  <ListItem disablePadding secondaryAction={children}>
    <ListItemButton tabIndex={-1} {...props}>
      <ListItemText primary={label} />
    </ListItemButton>
  </ListItem>
);

const ButtonInput: FC<{
  label: React.ReactNode;
  icon: React.ReactNode;
  onClick?: () => void;
  href?: string;
}> = ({label, icon, onClick, href}) => (
  <BaseInput {...{label, onClick, href}} component={href ? 'a' : 'div'}>
    <IconButton {...{onClick, href}} edge='end'>
      {icon}
    </IconButton>
  </BaseInput>
);

const SwitchInput: FC<{
  label: React.ReactNode;
  value: boolean;
  onChange: (newValue: boolean) => void;
}> = ({label, value, onChange}) => (
  <BaseInput {...{label}} onClick={() => onChange(!value)}>
    <MuiSwitch
      checked={value}
      edge='end'
      onChange={(e) => onChange(e.target.checked)}
    />
  </BaseInput>
);

const ColorInput: FC<{
  label: React.ReactNode;
  value: string;
  onChange: (newValue: string) => void;
  alpha?: boolean;
}> = ({label, value, onChange, alpha}) => {
  const [open, setOpen] = useState(false);

  return (
    <BaseInput {...{label}} onClick={() => setOpen(true)}>
      <ColorPicker
        {...{value, onChange, open, setOpen, alpha}}
        iconButtonProps={{edge: 'end'}}
      />
    </BaseInput>
  );
};

const IconInput: FC<{
  label: React.ReactNode;
  value: string;
  onChange: (newValue: string) => void;
}> = ({label, value, onChange}) => {
  const [open, setOpen] = useState(false);

  return (
    <BaseInput {...{label}} onClick={() => setOpen(true)}>
      <SimpleIconsPicker
        {...{value, onChange, open, setOpen}}
        iconButtonProps={{edge: 'end'}}
      />
    </BaseInput>
  );
};

const TextInput: FC<{
  label: React.ReactNode;
  value: string;
  onChange: (newValue: string) => void;
}> = ({label, value, onChange}) => {
  const textFieldRef = useRef<HTMLInputElement>();

  return (
    <BaseInput
      {...{label}}
      onClick={() => textFieldRef.current?.focus()}
      sx={{pr: '243px !important'}}
    >
      <OutlinedInput
        inputProps={{ref: textFieldRef}}
        onChange={(e) => onChange(e.target.value)}
        size='small'
        sx={{mr: '-8px'}}
        value={value}
      />
    </BaseInput>
  );
};

const NumberInput: FC<{
  label: React.ReactNode;
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
  softMin?: number;
  softMax?: number;
  step?: number;
}> = ({label, value, onChange, min, max, softMin, softMax, step}) => {
  const textFieldRef = useRef<HTMLInputElement>();
  const [inputNum, setInputNum] = useState(value);
  const [inputText, setInputText] = useState(() => value.toString());

  const clampVal = (v: number) => clamp(v, min, max, step);

  const setVal = (newValue: string | number) => {
    let newValueNum = Number(newValue);

    if (Number.isFinite(newValueNum)) {
      newValueNum = clampVal(newValueNum);
      setInputNum(newValueNum);
      onChange(newValueNum);
    }
  };

  const fixText = () => setInputText(inputNum.toString());

  useEffect(() => {
    if (value !== inputNum) {
      setInputNum(value);
      setInputText(value.toString());
    }
  }, [value]);

  return (
    <BaseInput
      {...{label}}
      onClick={() => textFieldRef.current?.focus()}
      sx={{pr: '243px !important'}}
    >
      <Stack alignItems='center' direction='row'>
        <Slider
          max={softMax ?? max}
          min={softMin ?? min}
          step={step}
          sx={{width: '132px', mr: '11px'}}
          value={value}
          onChange={(e, newValue) => {
            setInputText(newValue.toString());
            setInputNum(newValue);
            onChange(newValue);
          }}
        />
        <OutlinedInput
          inputProps={{ref: textFieldRef, inputMode: 'numeric'}}
          onBlur={fixText}
          size='small'
          sx={{mr: '-8px', width: '82px'}}
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            setVal(e.target.value);
          }}
          onKeyDown={(e) => {
            switch (e.key) {
              case 'Enter':
                e.preventDefault();
                fixText();
                break;

              case 'ArrowUp': {
                e.preventDefault();
                const newValue = clampVal(inputNum + (step ?? 1));
                setInputText(newValue.toString());
                setVal(newValue);
                break;
              }

              case 'ArrowDown': {
                e.preventDefault();
                const newValue = clampVal(inputNum - (step ?? 1));
                setInputText(newValue.toString());
                setVal(newValue);
                break;
              }

              default:
                break;
            }
          }}
        />
      </Stack>
    </BaseInput>
  );
};

const SelectInput = <T extends string | number>({
  label,
  value,
  onChange,
  options,
}: {
  label: React.ReactNode;
  value: T;
  onChange: (newValue: T) => void;
  options: Record<T, React.ReactNode>;
}): React.ReactElement => {
  const selectRef = useRef<HTMLSelectElement>();
  const [openSelect, setOpenSelect] = useState(false);

  return (
    <BaseInput
      {...{label}}
      sx={{pr: '243px !important'}}
      onClick={() => {
        selectRef.current?.focus();
        setOpenSelect(true);
      }}
    >
      <MuiSelect
        inputProps={{ref: selectRef}}
        onChange={(e) => onChange(e.target.value)}
        onClose={() => setOpenSelect(false)}
        onOpen={() => setOpenSelect(true)}
        open={openSelect}
        size='small'
        sx={{mr: '-8px', width: '235px'}}
        value={value}
      >
        {(Object.keys(options) as T[]).map((v) => (
          <MenuItem key={v} value={v}>
            {options[v]}
          </MenuItem>
        ))}
      </MuiSelect>
    </BaseInput>
  );
};

const FileInput: FC<{
  label: React.ReactNode;
  value: string;
  onChange: (newValue: string, newFileData?: string) => void;
  accept?: string;
}> = ({label, value, onChange, accept}) => {
  const [data, setData] = useStorage();
  const textFieldRef = useRef<HTMLInputElement>();
  const [text, setText] = useState(value);

  const deleteOldFile = (data: WritableDraft<StorageObject>) => {
    if (Object.prototype.hasOwnProperty.call(data.files, value)) {
      delete data.files[value];
    }
  };

  useEffect(() => {
    if (value !== text) setText(value);
  }, [value]);

  return (
    <BaseInput
      {...{label}}
      sx={{pr: '243px !important'}}
      onClick={() => {
        textFieldRef.current?.select();
      }}
    >
      <>
        <IconButton
          sx={{mr: '8px'}}
          onClick={async () =>
            uploadFile('raw', accept).then((file) => {
              setData(deleteOldFile);
              setData((data) => {
                let fileName = file.name;
                const filesKeys = Object.keys(data.files);
                if (filesKeys.includes(fileName)) {
                  for (
                    let index = 1;
                    filesKeys.includes(fileName);
                    index += 1
                  ) {
                    const fileNameSplit = file.name.split('.');
                    fileNameSplit[fileNameSplit.length - 2] += `(${index})`;
                    fileName = fileNameSplit.join('.');
                  }
                }
                data.files[fileName] = file.data;
                onChange(fileName);
              });
            })
          }
        >
          <FileUploadIcon />
        </IconButton>
        <OutlinedInput
          inputProps={{ref: textFieldRef}}
          onChange={(e) => setText(e.target.value)}
          size='small'
          sx={{mr: '-8px', width: '187px'}}
          value={text}
          onBlur={(e) => {
            if (e.target.value !== value) {
              setData(deleteOldFile);
              onChange(e.target.value);
            }
          }}
        />
      </>
    </BaseInput>
  );
};

const Inputs = {
  Base: BaseInput,
  Button: ButtonInput,
  Switch: SwitchInput,
  Color: ColorInput,
  Icon: IconInput,
  Text: TextInput,
  Number: NumberInput,
  Select: SelectInput,
  File: FileInput,
} as const;

export default Inputs;
