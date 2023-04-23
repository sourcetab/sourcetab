import {
  Box,
  IconButton,
  IconButtonProps,
  InputAdornment,
  OutlinedInput,
  Popover,
  Slider,
  useTheme,
} from '@mui/material';
import useEventListener from '@use-it/event-listener';
import {useEffect, useRef, useState} from 'react';

import {clamp, hexToRgba, hsvToRgb, rgbaToHex, rgbToHsv} from '@/utils';

const pickerWidth = 250;
const pickerHeight = 150;
const pointerRadius = 20;

const checkerboardBackground = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2 2'%3E%3Cpath fill='%23000' d='M0 0h1v1H0zm1 1h1v1H1z'/%3E%3Cpath fill='%23fff' d='M1 0h1v1H1zM0 1h1v1H0z'/%3E%3C/svg%3E")`;

const colorPickerInitState = {
  hex: '000000',
  hexInput: '000000',
  hsv: [0, 0, 0] as [number, number, number],
  alpha: 255,
};

const ColorPicker: FC<{
  value: string;
  onChange: (newValue: string) => void;
  open: boolean;
  setOpen: (newValue: boolean) => void;
  iconButtonProps?: IconButtonProps;
  alpha?: boolean;
}> = ({value, onChange, open, setOpen, iconButtonProps, alpha}) => {
  const iconButtonBoxRef = useRef();

  const [state, setState] = useState(colorPickerInitState);
  const [hexInput, setHexInput] = useState('000000');

  const hsvChange = (newHsv: [number, number, number]) => {
    const newRgb = hsvToRgb(newHsv);
    const newHex = rgbaToHex(newRgb);
    const newValue = rgbaToHex([...newRgb, state.alpha]);
    setState({
      ...state,
      hsv: newHsv,
      hex: newHex,
      hexInput: newValue,
    });
    onChange(newValue);
  };

  const alphaChange = (newAlpha: number) => {
    const newRgb = hsvToRgb(state.hsv);
    const newHex = rgbaToHex(newRgb);
    const newValue = rgbaToHex([...newRgb, newAlpha]);
    setState({
      ...state,
      hex: newHex,
      hexInput: newValue,
    });
    onChange(newValue);
  };

  const hexChange = (newHex: string) => {
    const newRgba = hexToRgba(newHex);
    if (newRgba) {
      if (!alpha) newRgba[3] = 255;
      const newHexSanitized = rgbaToHex([newRgba[0], newRgba[1], newRgba[2]]);
      const newValue = rgbaToHex(newRgba);
      const newHsv = rgbToHsv([newRgba[0], newRgba[1], newRgba[2]]);
      setState({
        ...state,
        hex: newHexSanitized,
        hexInput: newValue,
        alpha: newRgba[3],
        hsv: newHsv,
      });
      onChange(newValue);
    } else {
      setState({
        ...state,
        hexInput: value,
      });
    }
  };

  useEffect(() => {
    const newColor = hexToRgba(value);
    if (newColor) {
      const newColorRgb: [number, number, number] = [
        newColor[0],
        newColor[1],
        newColor[2],
      ];
      const newColorHex = rgbaToHex(newColorRgb);
      const newColorHsv = rgbToHsv(newColorRgb);
      if (newColorHex !== state.hex || newColor[3] !== state.alpha) {
        setState({
          hex: newColorHex,
          hexInput: value,
          alpha: newColor[3],
          hsv: newColorHsv,
        });
      }
    }
  }, [value]);

  useEffect(() => {
    setHexInput(state.hexInput);
  }, [state.hexInput]);

  const theme = useTheme();

  const pickerRef = useRef<HTMLDivElement>();
  const pointerRef = useRef<HTMLDivElement>();
  const [dragging, setDragging] = useState(false);

  const calculateColor = (e: MouseEvent | TouchEvent) => {
    const event: MouseEvent | (TouchEvent & Touch) =
      'touches' in e ? {...e, ...e.touches[0]} : e;

    event.preventDefault();
    pointerRef.current?.focus();
    const boundingClientRect = pickerRef.current?.getBoundingClientRect();

    if (boundingClientRect) {
      hsvChange([
        state.hsv[0],
        clamp(
          (event.pageX - (boundingClientRect.left + window.pageXOffset)) *
            (100 / pickerWidth),
          0,
          100,
        ),
        clamp(
          100 -
            (event.pageY - (boundingClientRect.top + window.pageYOffset)) *
              (100 / pickerHeight),
          0,
          100,
        ),
      ]);
    }
  };

  const dragStart = (e: MouseEvent | TouchEvent) => {
    setDragging(true);
    calculateColor(e);
  };

  const dragMove = (e: MouseEvent | TouchEvent) => {
    if (dragging) calculateColor(e);
  };

  const dragEnd = () => setDragging(false);

  useEventListener('mousemove', dragMove);
  useEventListener('touchmove', dragMove);
  useEventListener('mouseup', dragEnd);
  useEventListener('touchend', dragEnd);

  return (
    <>
      <IconButton onClick={() => setOpen(true)} {...iconButtonProps}>
        <Box
          ref={iconButtonBoxRef}
          sx={{
            position: 'relative',
            display: 'inline-block',
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundImage: checkerboardBackground,
          }}
        >
          <Box
            sx={{
              borderRadius: '50%',
              position: 'absolute',
              width: '100%',
              height: '100%',
              transform: 'scale(1.1)',
              boxShadow: '0 0 3px #000',
              backgroundColor: `#${value}`,
            }}
          />
        </Box>
      </IconButton>
      <Popover
        anchorEl={iconButtonBoxRef.current}
        onClose={() => setOpen(false)}
        open={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box>
          <Box
            onMouseDown={dragStart}
            onTouchStart={dragStart}
            ref={pickerRef}
            style={{backgroundColor: `hsl(${state.hsv[0]},100%,50%)`}}
            sx={{
              position: 'relative',
              width: `${pickerWidth}px`,
              height: `${pickerHeight}px`,
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to right, #fff, #fff0)',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(to top, #000, #0000)',
                }}
              />
            </Box>
            <Box
              ref={pointerRef}
              tabIndex={0}
              onKeyDown={(e) => {
                switch (e.key) {
                  case 'ArrowUp': {
                    hsvChange([
                      state.hsv[0],
                      state.hsv[1],
                      clamp(state.hsv[2] + 1, 0, 100),
                    ]);
                    break;
                  }
                  case 'ArrowLeft': {
                    hsvChange([
                      state.hsv[0],
                      clamp(state.hsv[1] - 1, 0, 100),
                      state.hsv[2],
                    ]);
                    break;
                  }
                  case 'ArrowDown': {
                    hsvChange([
                      state.hsv[0],
                      state.hsv[1],
                      clamp(state.hsv[2] - 1, 0, 100),
                    ]);
                    break;
                  }
                  case 'ArrowRight': {
                    hsvChange([
                      state.hsv[0],
                      clamp(state.hsv[1] + 1, 0, 100),
                      state.hsv[2],
                    ]);
                    break;
                  }
                  default: {
                    break;
                  }
                }
              }}
              sx={{
                position: 'absolute',
                width: `${pointerRadius}px`,
                height: `${pointerRadius}px`,
                border: '2px #fff solid',
                borderRadius: '50%',
                boxShadow: theme.shadows[2],
                '&:focus, &:hover': {
                  boxShadow: theme.shadows[8],
                },
                transition: `box-shadow ${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeInOut}`,
                outline: 'none',
                transform: `translate(${
                  state.hsv[1] * (pickerWidth / 100) - pointerRadius / 2
                }px,${
                  (100 - state.hsv[2]) * (pickerHeight / 100) -
                  pointerRadius / 2
                }px)`,
              }}
            />
          </Box>
          <Box sx={{position: 'relative', p: '12px 28px 12px'}}>
            <Slider
              max={359}
              value={state.hsv[0]}
              onChange={(e, newValue) =>
                hsvChange([newValue as number, state.hsv[1], state.hsv[2]])
              }
              sx={{
                color: `hsl(${state.hsv[0]},100%,50%)`,
                height: '8px',
                '.MuiSlider-rail': {
                  background:
                    'linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)',
                  opacity: 1,
                },
                '.MuiSlider-track': {
                  display: 'none',
                },
              }}
            />
            {alpha && (
              <Slider
                max={255}
                onChange={(e, newValue) => alphaChange(newValue as number)}
                value={state.alpha}
                sx={{
                  color: `#${state.hex}`,
                  height: '8px',
                  '.MuiSlider-rail': {
                    background: checkerboardBackground,
                    opacity: 1,
                    '&:after': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: 4,
                      background: `linear-gradient(to right,#${state.hex}00,#${state.hex}ff)`,
                    },
                  },
                  '.MuiSlider-track': {
                    display: 'none',
                  },
                }}
              />
            )}
            <OutlinedInput
              fullWidth
              onBlur={() => hexChange(hexInput)}
              onChange={(e) => setHexInput(e.target.value)}
              size='small'
              value={hexInput}
              startAdornment={
                <InputAdornment position='start'>#</InputAdornment>
              }
              sx={{
                position: 'relative',
                input: {
                  width: '8ch',
                  flexGrow: '1',
                },
              }}
            />
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default ColorPicker;
