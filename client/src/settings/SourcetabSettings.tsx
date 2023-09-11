import {Component} from 'solid-js';
import Inputs from '~/components/Inputs';

const SourcetabSettings: Component = (props) => {
  return (
    <>
      <Inputs.Text onReset={() => 4} allowReset>
        Hex
      </Inputs.Text>
      <Inputs.Select>Hello</Inputs.Select>
      <Inputs.Select onReset={4}>Hello</Inputs.Select>
    </>
  );
};

export default SourcetabSettings;
