import useStorage from '@/hooks/useStorage';

import WidgetItem from './WidgetItem';

export interface WidgetContainerProps {
  id: string;
  inToolbar?: boolean;
  editMode?: boolean;
  setEditMode: (newValue: boolean) => void;
  setWidgetsDialog: (newValue: boolean) => void;
  setSettingsDialog: (newValue: boolean) => void;
  setEditDialog: (newValue: string) => void;
}

export const DefaultWidgetContainer: FC<WidgetContainerProps> = ({
  id,
  setEditDialog,
  ...props
}) => {
  const [data] = useStorage();

  return data.widgets[id].c!.map((item, i) => (
    <WidgetItem
      id={item}
      key={item}
      onDelete={() => undefined}
      onDuplicate={() => undefined}
      onEdit={() => undefined}
      {...props}
    />
  ));
};
