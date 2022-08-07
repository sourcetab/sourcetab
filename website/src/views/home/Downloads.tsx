import {Box, Grid, Paper} from '@mui/material';

import theme from '@/theme';

export const downloadMap: Record<string, string> = {
  Demo: 'https://demo.weblauncher.app',
  Chrome:
    'https://chrome.google.com/webstore/detail/web-launcher/akomlegpokabommpdjfmhnbdcnaefmdo',
  Edge: 'https://microsoftedge.microsoft.com/addons/detail/web-launcher/fpknfiaimmgbbpplehjclidiphmhljeh',
  Firefox: 'https://addons.mozilla.org/en-US/firefox/addon/web-launcher/',
  Brave:
    'https://chrome.google.com/webstore/detail/web-launcher/akomlegpokabommpdjfmhnbdcnaefmdo',
  Vivaldi:
    'https://chrome.google.com/webstore/detail/web-launcher/akomlegpokabommpdjfmhnbdcnaefmdo',
};

const downloadJsx = Object.keys(downloadMap).map((download) => (
  <Grid item key={download} md={4} sm={6} xs={12}>
    <Paper
      component='a'
      elevation={2}
      href={downloadMap[download]}
      target='_blank'
      sx={{
        width: '100%',
        padding: '16px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ':hover': {
          boxShadow: theme.shadows[8],
        },
        ':focus': {
          boxShadow: theme.shadows[8],
          outline: 'none',
        },
      }}
    >
      <img
        height='64'
        src={`/assets/download/${download.toLowerCase()}.svg`}
        style={{marginRight: '16px'}}
        width='64'
      />
      {download}
    </Paper>
  </Grid>
));

const Downloads: FC = () => (
  <Box id='downloads' sx={{m: '32px 16px 12vh'}}>
    <Box component='h2' sx={{textAlign: 'center'}}>
      Download Now
    </Box>
    <Box
      sx={{
        padding: '16px 10%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Grid
        container
        spacing={4}
        sx={{
          maxWidth: '1200px',
        }}
      >
        {downloadJsx}
      </Grid>
    </Box>
  </Box>
);

export default Downloads;
