import {
  Article as ArticleIcon,
  BugReport as BugReportIcon,
  GitHub as GitHubIcon,
  Update as UpdateIcon,
} from '@mui/icons-material';
import {Box, List, Stack, SvgIcon, Typography} from '@mui/material';

import Inputs from '@/components/Inputs';
import SourcetabIcon from '@/components/SourcetabIcon';

const SourcetabInfo: FC = () => {
  return (
    <>
      <Stack
        alignItems='center'
        direction='row'
        justifyContent='center'
        marginBottom='8px'
      >
        <SourcetabIcon />
        <Box marginLeft='16px'>
          <Typography fontWeight='bold' variant='h5'>
            Sourcetab
          </Typography>
          <Typography variant='h6'>{VERSION}</Typography>
        </Box>
      </Stack>
      <List>
        <Inputs.Button
          href='https://sourcetab.org/docs'
          icon={<ArticleIcon />}
          label='Documentation'
        />
        <Inputs.Button
          href='https://github.com/sourcetab/sourcetab'
          label='GitHub Repository'
          icon={
            <SvgIcon>
              <GitHubIcon />
            </SvgIcon>
          }
        />
        <Inputs.Button
          href='https://github.com/sourcetab/sourcetab/issues'
          label='Report Bug'
          icon={
            <SvgIcon>
              <BugReportIcon />
            </SvgIcon>
          }
        />
        <Inputs.Button
          href={`https://github.com/sourcetab/sourcetab/releases/tag/v${VERSION}`}
          icon={<UpdateIcon />}
          label='Release Notes'
        />
      </List>
    </>
  );
};

export default SourcetabInfo;
