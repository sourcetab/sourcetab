export default function parse(value, isJson = false) {
  if (value) {
    if (isJson) {
      return JSON.parse(value);
    }
    return value;
  }
  return undefined;
}
