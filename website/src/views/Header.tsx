import {
  Article as ArticleIcon,
  Download as DownloadIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material';
import {AppBar, Box, Toolbar} from '@mui/material';
import IconButtonLink from '@/components/IconButtonLink';
import Link from '@/components/Link';
import theme from '@/theme';

const linkMap = {
  '/#downloads': {text: 'Downloads', icon: DownloadIcon},
  'https://github.com/sourcetab/sourcetab': {
    text: 'GitHub',
    icon: GitHubIcon,
  },
  '/docs': {text: 'Docs', icon: ArticleIcon},
} as const;

const textJsx = (Object.keys(linkMap) as Array<keyof typeof linkMap>).map(
  (link) => (
    <Link
      color='inherit'
      fontSize='18px'
      href={link}
      key={link}
      sx={{margin: '4px', padding: '4px', textDecoration: 'none'}}
    >
      {linkMap[link].text}
    </Link>
  ),
);

const iconJsx = (Object.keys(linkMap) as Array<keyof typeof linkMap>).map(
  (link) => {
    const Icon = linkMap[link].icon;

    return (
      <IconButtonLink
        color='inherit'
        href={link}
        key={link}
        title={linkMap[link].text}
      >
        <Icon />
      </IconButtonLink>
    );
  },
);

const Header: FC = () => (
  <AppBar
    position='sticky'
    sx={{alignItems: 'center', zIndex: theme.zIndex.drawer + 1}}
  >
    <Toolbar sx={{width: '100%', maxWidth: '1000px'}}>
      <Link
        color='inherit'
        fontSize='26px'
        href='/'
        letterSpacing='-1px'
        sx={{
          textDecoration: 'none',
          fontFamily: 'Nunito, sans-serif',
          fontWeight: '800',
          margin: '4px',
          padding: '4px',
        }}
      >
        Sourcetab
      </Link>
      <Box sx={{flexGrow: '1'}} />
      <Box
        sx={{
          display: 'none',
          [theme.breakpoints.up('sm')]: {
            display: 'block',
          },
        }}
      >
        {textJsx}
      </Box>
      <Box
        sx={{
          display: 'block',
          [theme.breakpoints.up('sm')]: {
            display: 'none',
          },
        }}
      >
        {iconJsx}
      </Box>
    </Toolbar>
  </AppBar>
);

export default Header;
