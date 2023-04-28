import {Box, Divider, Stack, Typography} from '@mui/material';
import type {GetStaticProps, NextPage} from 'next';
import Head from 'next/head';
import Downloads from '@/views/home/Downloads';
import ExtensionStats from '@/views/home/ExtensionStats';
import getExtensionStatsData, {
  ExtensionStatsData,
} from '@/getExtensionStatsData';
import Screenshots from '@/views/home/Screenshots';
import Install from '@/views/home/Install';
import Features from '../views/home/Features.mdx';

interface HomeProps {
  extensionStatsData: ExtensionStatsData;
}

const Home: NextPage<HomeProps> = ({extensionStatsData}) => {
  const title = 'Sourcetab: New Tab Dashboard';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          content="An open-source dashboard for your browser's new tab page, customizable with a variety of widgets and settings."
          name='description'
        />
      </Head>
      <Box sx={{m: '10vh 16px 32px', textAlign: 'center'}}>
        <Box
          component='h1'
          sx={{fontFamily: 'Nunito, sans-serif', fontWeight: '800'}}
        >
          {title}
        </Box>
        <Typography fontSize='1.125rem'>
          An open-source dashboard for your browser&apos;s new tab page,
          <br />
          customizable with a variety of widgets and settings.
        </Typography>

        <Stack alignItems='center'>
          <Divider sx={{m: '32px', width: '100%', maxWidth: '600px'}} />
        </Stack>

        <Stack alignItems='center'>
          <Install />
        </Stack>

        <ExtensionStats {...extensionStatsData} />

        <Stack alignItems='center'>
          <Typography component='div' textAlign='left'>
            <Features />
          </Typography>
        </Stack>
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
