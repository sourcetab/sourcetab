import ArrayState from './ArrayState';

/**
 * @param {[any, React.Dispatch<any>]}
 */
export default function useRichState([state, setState]) {
  if (Array.isArray(state)) {
    return new ArrayState(state, setState);
  }

  return [state, setState];
}
