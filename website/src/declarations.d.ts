type FC<P = Record<string, unknown>> = import('react').FunctionComponent<
  P & {children?: React.ReactNode}
>;
