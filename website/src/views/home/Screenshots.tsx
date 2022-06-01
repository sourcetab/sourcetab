import {
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
} from '@mui/icons-material';
import {Box, Button, MobileStepper, Paper, Stack} from '@mui/material';
import {useEffect, useState} from 'react';
import screenshot1 from '../../../../brand/screenshots/screenshot1.png';
import screenshot2 from '../../../../brand/screenshots/screenshot2.png';
import screenshot3 from '../../../../brand/screenshots/screenshot3.png';
import screenshot4 from '../../../../brand/screenshots/screenshot4.png';

const images = [screenshot1, screenshot2, screenshot3, screenshot4];

const maxSteps = images.length;

let timer: NodeJS.Timer | undefined;

const Screenshots: FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep < 1 ? maxSteps - 1 : prevActiveStep - 1,
    );
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep + 2 > maxSteps ? 0 : prevActiveStep + 1,
    );
  };

  const startTimer = () => {
    timer = setInterval(handleNext, 5000);
  };

  const stopTimer = () => {
    timer = clearInterval(timer)!;
  };

  const resetTimer = () => {
    stopTimer();
    startTimer();
  };

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, []);

  return (
    <Stack alignItems='center'>
      <Box sx={{width: '75vw', maxWidth: 750}}>
        <Paper elevation={4} sx={{position: 'relative', pt: '62.5%'}}>
          {images.map((step, index) => (
            <Box
              component='img'
              key={step.src}
              src={step.src}
              sx={{
                transition: 'opacity 1s',
                width: '100%',
                height: '100%',
                top: 0,
                objectFit: 'contain',
                display: 'block',
                position: 'absolute',
                opacity: activeStep === index ? 1 : 0,
              }}
            />
          ))}
        </Paper>
        <MobileStepper
          activeStep={activeStep}
          position='static'
          steps={maxSteps}
          backButton={
            <Button
              size='small'
              onClick={() => {
                resetTimer();
                handleBack();
              }}
            >
              <KeyboardArrowLeftIcon />
            </Button>
          }
          nextButton={
            <Button
              size='small'
              onClick={() => {
                resetTimer();
                handleNext();
              }}
            >
              <KeyboardArrowRightIcon />
            </Button>
          }
        />
      </Box>
    </Stack>
  );
};

export default Screenshots;
