import {IconifyInfo} from '@iconify/types';
import {Icon} from '@iconify-icon/react';
import {FilterList} from '@mui/icons-material';
import {
  Box,
  Card,
  CardActionArea,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  FormControl,
  IconButton,
  type IconButtonProps,
  InputAdornment,
  InputLabel,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  OutlinedInput,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import {useEffect, useRef, useState} from 'react';
import {FixedSizeGrid} from 'react-window';

import useStorage from '@/hooks/useStorage';

import DialogTitleActions from './DialogTitleActions';

const initialSearchLimit = 50;
const maxSearchLimit = 999;

const IconPicker: FC<{
  value: string;
  onChange: (newValue: string) => void;
  open: boolean;
  setOpen: (newValue: boolean) => void;
  iconButtonProps?: IconButtonProps;
  initialSearch?: string;
}> = ({value, onChange, open, setOpen, iconButtonProps, initialSearch}) => {
  const [data, setData] = useStorage();
  const iconButtonSvgRef = useRef();
  const [search, setSearch] = useState(initialSearch ?? '');
  const [results, setResults] = useState<string[]>([]);
  const [maxLimit, setMaxLimit] = useState(false);
  const [filter, setFilter] = useState(false);
  const [filterData, setFilterData] =
    useState<Record<string, Record<string, IconifyInfo>>>();

  useEffect(() => {
    const searchDebounce = setTimeout(() => {
      if (search) {
        const searchParams = new URLSearchParams();
        searchParams.append('query', search);
        searchParams.append(
          'limit',
          String(maxLimit ? maxSearchLimit : initialSearchLimit),
        );
        if (data.settings.icons.length > 0) {
          searchParams.append('prefixes', data.settings.icons.join(','));
        }

        fetch(`https://api.iconify.design/search?${searchParams.toString()}`)
          .then(async (res) => res.json())
          .then((v) => setResults(v.icons));
      }
    }, 300);

    return () => clearTimeout(searchDebounce);
  }, [search, maxLimit]);

  useEffect(() => {
    if (filter && !filterData) {
      fetch('https://api.iconify.design/collections')
        .then(async (res) => res.json())
        .then((collections: Record<string, IconifyInfo>) => {
          const categories: Record<string, Record<string, IconifyInfo>> = {};
          const archivedCollections: Record<string, IconifyInfo> = {};
          for (const collection of Object.keys(collections)) {
            const category = collections[collection].category ?? 'Other';
            if (category === 'Archive / Unmaintained') {
              archivedCollections[collection] = collections[collection];
            } else {
              if (!(category in categories)) categories[category] = {};
              categories[category][collection] = collections[collection];
            }
          }
          categories['Archive / Unmaintained'] = archivedCollections;
          setFilterData(categories);
        });
    }
  }, [filter]);

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        ref={iconButtonSvgRef}
        {...iconButtonProps}
      >
        <Icon height={24} icon={value} width={24} />
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
        <Stack alignItems='center' direction='row'>
          <FormControl>
            <InputLabel>Search</InputLabel>
            <OutlinedInput
              label='Search'
              type='search'
              value={search}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton onClick={() => setFilter(true)}>
                    <FilterList />
                  </IconButton>
                </InputAdornment>
              }
              onChange={(e) => {
                setSearch(e.target.value);
                setMaxLimit(false);
              }}
            />
          </FormControl>
        </Stack>
        <Box sx={{mt: '9px'}}>
          <FixedSizeGrid
            columnCount={5}
            columnWidth={58}
            height={290}
            overscanRowCount={2}
            rowCount={Math.ceil(results.length / 5)}
            rowHeight={58}
            style={{scrollbarWidth: 'none'}}
            width={290}
          >
            {({columnIndex, rowIndex, style}) => {
              const index = rowIndex * 5 + columnIndex;

              if (!maxLimit && index + 1 === initialSearchLimit)
                setTimeout(() => setMaxLimit(true));

              return results.length > index ? (
                <Box style={style}>
                  <Card sx={{m: '4px'}}>
                    <CardActionArea
                      title={results[index]}
                      onClick={() => {
                        setOpen(false);
                        onChange(results[index]);
                      }}
                      sx={{
                        width: '50px',
                        height: '50px',
                        p: '8px',
                      }}
                    >
                      <Icon height='34px' icon={results[index]} width='34px' />
                    </CardActionArea>
                  </Card>
                </Box>
              ) : null;
            }}
          </FixedSizeGrid>
        </Box>
      </Popover>
      <Dialog
        fullWidth
        maxWidth='sm'
        onClose={() => setFilter(false)}
        open={filter}
      >
        <DialogTitleActions onClose={() => setFilter(false)}>
          Icon Sets
        </DialogTitleActions>
        <DialogContent>
          {filterData ? (
            <List
              dense
              subheader={<li />}
              sx={{
                width: '100%',
                '& ul': {padding: 0},
              }}
            >
              {Object.keys(filterData).map((category) => (
                <li key={category}>
                  <ul>
                    <ListSubheader>{category}</ListSubheader>
                    {Object.keys(filterData[category]).map((collection) => (
                      <ListItem
                        key={collection}
                        secondaryAction={
                          <Stack direction='row' spacing={1}>
                            <Typography variant='caption'>
                              {filterData[category][collection].total}
                            </Typography>
                            {filterData[category][collection].samples?.map(
                              (sample) => (
                                <Icon
                                  height={24}
                                  icon={`${collection}:${sample}`}
                                  key={sample}
                                  width={24}
                                />
                              ),
                            )}
                          </Stack>
                        }
                      >
                        <ListItemIcon>
                          <Checkbox
                            checked={data.settings.icons.includes(collection)}
                            onClick={() => {
                              if (data.settings.icons.includes(collection)) {
                                setData((data) => {
                                  data.settings.icons.splice(
                                    data.settings.icons.indexOf(collection),
                                    1,
                                  );
                                });
                              } else {
                                setData((data) => {
                                  data.settings.icons.push(collection);
                                });
                              }
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <>
                              {filterData[category][collection].name}
                              {filterData[category][collection].version && (
                                <small>
                                  {' '}
                                  {filterData[category][collection].version}
                                </small>
                              )}
                            </>
                          }
                          secondary={
                            <>
                              by{' '}
                              <Link
                                color='inherit'
                                href={
                                  filterData[category][collection].author.url
                                }
                              >
                                {filterData[category][collection].author.name}
                              </Link>
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </ul>
                </li>
              ))}
            </List>
          ) : (
            <Stack
              alignItems='center'
              direction='row'
              height='200px'
              justifyContent='center'
              width='100%'
            >
              <CircularProgress />
            </Stack>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default IconPicker;
