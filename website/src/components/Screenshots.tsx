import {Component, For, createSignal, onCleanup, onMount} from 'solid-js';
import LeftArrow from '~icons/material-symbols/arrow-left-rounded';
import RightArrow from '~icons/material-symbols/arrow-right-rounded';
import screenshot1 from '../../../brand/screenshots/small/screenshot1.webp';
import screenshot2 from '../../../brand/screenshots/small/screenshot2.webp';
import screenshot3 from '../../../brand/screenshots/small/screenshot3.webp';

const images = [screenshot1, screenshot2, screenshot3];

const maxSteps = images.length;

let timer: NodeJS.Timer | undefined;

const Screenshots: Component = () => {
  const [activeStep, setActiveStep] = createSignal(0);

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

  onMount(startTimer);
  onCleanup(stopTimer);

  return (
    <div class='w-full'>
      <div class='relative pt-[62.5%]'>
        <For each={images}>
          {(step, index) => (
            <img
              class='block absolute object-contain top-0 w-full h-full duration-1000'
              src={step}
              style={{opacity: activeStep() === index() ? 1 : 0}}
            />
          )}
        </For>
      </div>
      <div class='flex justify-between'>
        <button
          class='btn-secondary border-none'
          type='button'
          onClick={() => {
            resetTimer();
            handleBack();
          }}
        >
          <LeftArrow />
        </button>
        <button
          class='btn-secondary border-none'
          type='button'
          onClick={() => {
            resetTimer();
            handleNext();
          }}
        >
          <RightArrow />
        </button>
      </div>
    </div>
  );
};

export default Screenshots;
