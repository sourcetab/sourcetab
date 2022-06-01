declare const PLATFORM: 'WEB' | 'CHROME' | 'FIREFOX';

type FC<P = Record<string, unknown>> = import('react').FunctionComponent<
  P & {children?: React.ReactNode}
>;

type GradientValue = [number, string, string];

interface InitialWidgetData {
  label: string;
}

type WidgetData = InitialWidgetData & Record<string, unknown>;

interface StoredWidgetType {
  /** Type */
  t: string;
  /** Data */
  d: WidgetData;
  /** Children */
  c?: string[];
}

interface StorageObject {
  weblauncher: string;
  date: number;
  releaseNotes: boolean;
  widgets: Record<string, StoredWidgetType>;
  settings: {
    widgets: Record<string, Record<string, unknown>>;
    themeColor: string;
    darkMode: 'auto' | 'enabled' | 'disabled';
    pageTitle: string;
    borderRadius: number;
    showHelp: boolean;
    dashboard: {
      columns: number;
      margin: number;
      gap: number;
      radius: number;
      size: number;
    };
    toolbar: {
      position: 'top' | 'bottom';
    };
    bg:
      | ['color', string]
      | ['gradient', ...GradientValue]
      | ['image', string]
      | ['video', string]
      | ['iframe', string]
      | ['youtube', string];
  };
  files: Record<string, string>;
}

type SetStorageObject = import('use-immer').Updater<StorageObject>;

interface Widget<
  LocalData = Record<string, unknown>,
  GlobalData = Record<string, unknown>,
> {
  name: string;
  help: string;
  defaultData: LocalData;
  exampleData: LocalData;
  defaultGlobalData: GlobalData;
  Widget: (props: {
    data: LocalData & InitialWidgetData;
    setData: (newValue: LocalData & InitialWidgetData) => void;
    globalData: GlobalData;
    setGlobalData: (newValue: GlobalData) => void;
    inToolbar?: boolean;
    disable?: boolean;
  }) => React.ReactElement;
  Settings: (props: {
    data: LocalData & InitialWidgetData;
    setData: (newValue: LocalData & InitialWidgetData) => void;
    globalData: GlobalData;
    setGlobalData: (newValue: GlobalData) => void;
  }) => React.ReactElement;
  GlobalSettings?: (props: {
    data: GlobalData;
    setData: (newValue: GlobalData) => void;
  }) => React.ReactElement;
}
