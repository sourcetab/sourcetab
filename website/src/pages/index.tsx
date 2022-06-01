import {Box, Divider, Stack, Typography} from '@mui/material';
import type {GetStaticProps, NextPage} from 'next';
import Head from 'next/head';
import Downloads from '@/views/home/Downloads';
import ExtensionStats from '@/views/home/ExtensionStats';
import getExtensionStatsData, {
  ExtensionStatsData,
} from '@/getExtensionStatsData';
import Screenshots from '@/views/home/Screenshots';

interface HomeProps {
  extensionStatsData: ExtensionStatsData;
}

const Home: NextPage<HomeProps> = ({extensionStatsData}) => {
  const title = 'Web Launcher: New Tab Dashboard';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          content="A material design dashboard for your browser's new tab page."
          name='description'
        />
      </Head>
      <Box sx={{m: '10vh 16px', textAlign: 'center'}}>
        <Box
          component='h1'
          sx={{fontFamily: 'Nunito, sans-serif', fontWeight: '800'}}
        >
          {title}
        </Box>
        <Typography fontSize='1.125rem'>
          A material design dashboard for your browser&apos;s new tab page
          <br />
          customizable with a variety of widgets and settings.
        </Typography>
        <Stack alignItems='center'>
          <Divider sx={{m: '4vh', width: '100%', maxWidth: '600px'}} />
        </Stack>
        <ExtensionStats {...extensionStatsData} />
      </Box>

      <Screenshots />

      <Downloads />
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async (context) => ({
  props: {extensionStatsData: await getExtensionStatsData()},
});
