declare const PLATFORM: 'WEB' | 'CHROME' | 'FIREFOX';
declare const VERSION: string;

type DeepRequired<T> = Required<{
  [K in keyof T]: DeepRequired<T[K]>;
}>;

type Inter<T> = [DeepRequired<T>, (fn: (state: T) => void) => void, T];

interface WidgetData {
  type: string;
  name: string;
  options?: Record<string, unknown>;
  size?: Size;
  theme?: WidgetTheme;
  themeHover?: WidgetTheme;
  children?: string[];
}

type Size = [number, number];

type GradientValue = [number, string, string];

type Background =
  | ['color', string]
  | ['gradient', ...GradientValue]
  | ['image', string];

type ComplexBackground =
  | Background
  | ['video', string]
  | ['iframe', string]
  | ['youtube', string];

interface Font {
  color?: string;
  family?: string;
  italic?: boolean;
  size?: number;
  weight?: number;
}

interface BoxShadow {
  offsetX?: number;
  offsetY?: number;
  blur?: number;
  spread?: number;
  color?: string;
  inset?: boolean;
}

interface TextShadow {
  offsetX?: number;
  offsetY?: number;
  blur?: number;
  color?: string;
}

interface Transform {
  translateX?: number;
  translateY?: number;
  scale?: number;
  rotate?: number;
}

interface ToolbarTheme {
  background?: Background;
  radius?: number;
  shadow?: BoxShadow;
}

interface Transition {
  duration?: number;
  function?: string;
}

interface WidgetTheme {
  background?: Background;
  color?: string;
  fontFamily?: string;
  labelFont?: Font;
  radius?: number;
  shadow?: BoxShadow;
  labelShadow?: TextShadow;
  transform?: Transform;
  labelTransform?: Transform;
  transition?: Transition;
}

interface Theme {
  background?: ComplexBackground;
  color?: {
    accent?: string;
    neutral?: string;
  };
  fontFamily?: string;
  radius?: number;
  toolbar?: ToolbarTheme;
  widget?: WidgetTheme;
  widgetHover?: WidgetTheme;
}

interface Layout {
  dashboard?: {
    columns?: number;
    margin?: number;
    gap?: number;
    size?: number;
  };
  toolbar?: {
    margin?: number;
    padding?: number;
    position?: 'top' | 'bottom';
  };
}

interface Page {
  pageTitle?: string;
  showHelp?: boolean;
  linkTarget?: '_self' | '_blank';
  linkContainer?: string;
}

interface Settings {
  theme?: Theme;
  layout?: Layout;
  page?: Page;
}

interface User {
  settings?: Settings;
  presets?: Presets;
  icons?: string[];
}

interface Workspace {
  name: string;
  widgets: Record<string, WidgetData>;
  settings?: Settings;
}

interface Presets {
  layouts?: Record<string, Layout>;
  themes?: Record<string, Theme>;
  widgets?: Record<string, WidgetData>;
  workspaces?: Record<string, Workspace>;
}

interface Local {
  sync: boolean;
  updated: boolean;
}

interface StorageObject {
  sourcetab: string;
  date: number;
  user: User;
  workspace: string;
  workspaces: Record<string, Workspace>;
  files: Record<string, string>;
  local: Local;
}

interface DataSelection {
  workspace: {
    widgets: boolean;
    theme: boolean;
    layout: boolean;
    page: boolean;
  };
  workspaces: Record<string, boolean>;
  presets: {
    themes: boolean;
    layouts: boolean;
    widgets: boolean;
  };
  files: Record<string, boolean>;
}

interface Widget<Options = Record<string, unknown>> {
  name: string;
  defaultOptions: Options;
  exampleOptions: Options;
  Component: import('solid-js').Component<{
    options: Inter<Options>;
    inToolbar?: boolean;
    disabled?: boolean;
  }>;
  options?: Record<
    string,
    {control?: import('solid-js').Component} & (
      | {
          type: 'text';
          default: string;
          example?: string;
        }
      | {
          type: 'select';
          default: string;
          options?: Record<string, string>;
        }
      | {
          type: 'boolean';
          default: boolean;
        }
      | {
          type: 'number';
          default: number;
          min?: number;
          max?: number;
          step?: number;
        }
      | {
          type: 'icon';
          default: string;
        }
      | {
          type: 'color';
          default: string;
          alpha?: boolean;
        }
    )
  >;
  Options: import('solid-js').Component<{
    options: Inter<Options>;
  }>;
}
