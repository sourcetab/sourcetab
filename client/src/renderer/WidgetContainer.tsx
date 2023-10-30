import {Component, For, splitProps} from 'solid-js';
import {useWorkspace} from '~/storage/useWorkspace';

import WidgetItem from './WidgetItem';

export interface WidgetContainerProps {
  id: string;
  inToolbar?: boolean;
}

export const DefaultWidgetContainer: Component<WidgetContainerProps> = (
  props,
) => {
  const [ws] = useWorkspace();

  const [local, others] = splitProps(props, ['id']);

  return (
    <For each={ws.widgets[local.id].children}>
      {(item) => <WidgetItem id={item} {...others} />}
    </For>
  );
};
