import {
  Box,
  Card,
  CardActionArea,
  FormControl,
  IconButton,
  IconButtonProps,
  InputLabel,
  OutlinedInput,
  Popover,
  Stack,
  SvgIcon,
  SvgIconProps,
} from '@mui/material';
import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {FixedSizeGrid} from 'react-window';

declare const SIMPLEICONSCONFIG: Record<string, [string, string, boolean]>;

export const simpleIconsConfig = SIMPLEICONSCONFIG;

const simpleIconsContext = createContext<(icon: string) => string>(() => '');

export const SimpleIconsContextProvider: FC = ({children}) => {
  const iconsRef = useRef<Record<string, string>>({});
  const [iconsState, setIconsState] = useState<Record<string, string>>({});

  return (
    <simpleIconsContext.Provider
      value={useCallback(
        (icon) => {
          if (iconsState[icon]) return iconsState[icon];

          if (iconsState[icon] !== '') {
            iconsRef.current[icon] = '';

            fetch(`simpleicons/${icon}`)
              .then((v) => (v.ok ? v.text() : ''))
              .then((v) => {
                iconsRef.current[icon] = v;
                setIconsState({...iconsRef.current});
              });
          }

          return '';
        },
        [iconsState],
      )}
    >
      {children}
    </simpleIconsContext.Provider>
  );
};

export const SimpleIcons: FC<
  Omit<React.SVGProps<SVGPathElement>, 'd'> & {icon: string}
> = memo(({icon, ...props}) => {
  const getIcon = useContext(simpleIconsContext);

  return <path d={getIcon(icon) || undefined} {...props} />;
});

export const SimpleIconsPicker: FC<{
  value: string;
  onChange: (newValue: string) => void;
  open: boolean;
  setOpen: (newValue: boolean) => void;
  iconButtonProps?: IconButtonProps;
}> = ({value, onChange, open, setOpen, iconButtonProps}) => {
  const iconButtonSvgRef = useRef();
  const [search, setSearch] = useState('');
  const [simpleIconsFiltered, setSimpleIconsFiltered] = useState<string[]>([]);

  useEffect(() => {
    const searchDebounce = setTimeout(() => {
      const optimizedSearch = search.toLowerCase();

      setSimpleIconsFiltered(
        Object.keys(simpleIconsConfig)
          .filter((v) =>
            simpleIconsConfig[v][0].toLowerCase().includes(optimizedSearch),
          )
          .sort((a, b) => {
            const aIndex = simpleIconsConfig[a][0]
              .toLowerCase()
              .indexOf(optimizedSearch);
            const bIndex = simpleIconsConfig[b][0]
              .toLowerCase()
              .indexOf(optimizedSearch);

            if (aIndex < bIndex) return -1;
            if (aIndex > bIndex) return 1;

            return 0;
          }),
      );
    }, 300);

    return () => clearTimeout(searchDebounce);
  }, [search]);

  return (
    <>
      <IconButton onClick={() => setOpen(true)} {...iconButtonProps}>
        <SvgIcon ref={iconButtonSvgRef}>
          <SimpleIcons icon={value} />
        </SvgIcon>
      </IconButton>
      <Popover
        anchorEl={iconButtonSvgRef.current}
        onClose={() => setOpen(false)}
        open={open}
        sx={{'.MuiPopover-paper': {p: '12px'}}}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <FormControl>
          <InputLabel>Search</InputLabel>
          <OutlinedInput
            label='Search'
            onChange={(e) => setSearch(e.target.value)}
            type='search'
            value={search}
          />
        </FormControl>
        <Box sx={{mt: '9px'}}>
          <FixedSizeGrid
            columnCount={4}
            columnWidth={55}
            height={235}
            overscanRowCount={2}
            rowCount={Math.ceil(simpleIconsFiltered.length / 4)}
            rowHeight={55}
            width={235}
          >
            {({columnIndex, rowIndex, style}) => {
              const index = rowIndex * 4 + columnIndex;

              return simpleIconsFiltered.length > index ? (
                <Box style={style}>
                  <Card sx={{m: '3px'}}>
                    <CardActionArea
                      title={simpleIconsConfig[simpleIconsFiltered[index]][0]}
                      onClick={() => {
                        setOpen(false);
                        onChange(simpleIconsFiltered[index]);
                      }}
                      sx={{
                        width: '49px',
                        height: '49px',
                        p: '8px',
                        backgroundColor: `#${
                          simpleIconsConfig[simpleIconsFiltered[index]][1]
                        }`,
                      }}
                    >
                      <SvgIcon
                        sx={{
                          width: '33px',
                          height: '33px',
                          color: simpleIconsConfig[
                            simpleIconsFiltered[index]
                          ][2]
                            ? 'white'
                            : 'black',
                        }}
                      >
                        <SimpleIcons icon={simpleIconsFiltered[index]} />
                      </SvgIcon>
                    </CardActionArea>
                  </Card>
                </Box>
              ) : null;
            }}
          </FixedSizeGrid>
        </Box>
      </Popover>
    </>
  );
};
