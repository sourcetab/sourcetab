import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from '@mui/material';
import {Fragment} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import ListItemButtonLink from '@/components/ListItemButtonLink';
import docsConfig from '@/docsConfig';

export type DocsConfig = Array<{
  name: string;
  path: string;
  children?: DocsConfig;
}>;

const drawerWidth = 200;

const docsNavGen = (() => {
  const generateNav = (config: DocsConfig, path = '/docs', indent = 0) =>
    config.map((v) => (
      <Fragment key={v.name}>
        <ListItem disablePadding>
          <ListItemButtonLink
            href={`${path}/${v.path}`}
            sx={{p: '4px 24px', m: '2px 0', borderRadius: 2}}
          >
            <ListItemText
              primary={v.name}
              sx={{color: 'black', pl: `${indent * 16}px`}}
            />
          </ListItemButtonLink>
        </ListItem>
        {v.children && (
          <List disablePadding component='div'>
            {generateNav(v.children, path + '/' + v.path, indent + 1)}
          </List>
        )}
      </Fragment>
    ));

  return (
    <List
      sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper', p: '8px'}}
    >
      {generateNav(docsConfig)}
    </List>
  );
})();

const titleGen = (
  paths: string[],
  config = docsConfig,
  current = 'Web Launcher | Docs',
): string => {
  if (paths.length > 0) {
    const path = paths.shift();
    const fConfig = config.find((v) => v.path === path)!;
    current += ` | ${fConfig.name}`;

    return titleGen(paths, fConfig.children, current);
  }

  return current;
};

const DocsLayout: FC = ({children}) => {
  const {pathname} = useRouter();

  return (
    <>
      <Head>
        <title>{titleGen(pathname.split('/').splice(2))}</title>
      </Head>
      <Box>
        <Box style={{display: 'flex'}} sx={{display: 'flex'}}>
          <Drawer
            variant='permanent'
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
          >
            <Toolbar />
            <Box sx={{overflow: 'auto'}}>{docsNavGen}</Box>
          </Drawer>
          <Box
            sx={{
              flexGrow: 1,
              m: '24px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box sx={{maxWidth: '900px', flexGrow: 1}}>{children}</Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DocsLayout;
