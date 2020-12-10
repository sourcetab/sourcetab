export default function ArrayState(state, setState) {
  return {
    get: state,
    set: setState,
    /**
     * @param {*} value
     * @param {number} index
     */
    pushItem: (value, index) => {
      const tmpState = state;
      if (index === undefined) {
        tmpState.push(value);
      } else {
        tmpState.splice(index, 0, value);
      }
      setState(tmpState);
    },
    /**
     * @param {number} index
     * @param {*} value
     */
    setItem: (index, value) => {
      const tmpState = state;
      tmpState[index] = value;
      setState(tmpState);
    },
    /**
     * @param {number} index
     */
    removeItem: index => {
      const tmpState = state;
      tmpState.splice(index, 1);
      setState(tmpState);
    },
  };
}
