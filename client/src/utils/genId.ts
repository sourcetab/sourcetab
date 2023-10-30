export default function genId(): string {
  return String.fromCodePoint(
    ...Array.from({length: 12}).map(() => {
      let code = Math.floor(Math.random() * 93) + 32;

      if (code > 33) code += 1;
      if (code > 91) code += 1;

      return code;
    }),
  );
}
