import {Box, Rating, Stack, Typography} from '@mui/material';
import {ExtensionStatsData} from '@/getExtensionStatsData';

const ExtensionStats: FC<ExtensionStatsData> = (extensionStatsData) => {
  return (
    <Stack alignItems='center' spacing='8px'>
      <Typography>
        <Box component='span' fontSize='1.25rem' fontWeight='500'>
          {extensionStatsData.users}
        </Box>{' '}
        Users
      </Typography>
      <Stack alignItems='center' direction='row' spacing='12px'>
        <Rating
          readOnly
          precision={0.1}
          size='large'
          value={extensionStatsData.ratingValue}
        />
        <Typography>
          <Box component='span' fontSize='1.125rem' fontWeight='500'>
            {extensionStatsData.ratingCount}
          </Box>{' '}
          Ratings
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ExtensionStats;
