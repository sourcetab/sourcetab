/* eslint-disable @typescript-eslint/ban-types */

import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import {Box} from '@mui/material';
import {useState} from 'react';

import {current} from 'immer';
import useStorage from '@/hooks/useStorage';

import {genId} from '@/utils';
import {WidgetContainerProps} from './WidgetContainer';
import WidgetItem, {WidgetItemProps} from './WidgetItem';

const SortableWidgetItem: FC<WidgetItemProps> = ({id, ...props}) => {
  const {active, attributes, listeners, setNodeRef, transform, transition} =
    useSortable({id});

  return (
    <WidgetItem
      id={id}
      innerProps={listeners}
      ref={setNodeRef}
      rootProps={{
        ...attributes,
        style: {
          visibility: id === active?.id ? 'hidden' : 'visible',
          transform: transform
            ? `translate3d(${transform.x ? Math.round(transform.x) : 0}px, ${
                transform.y ? Math.round(transform.y) : 0
              }px, 0)`
            : '',
          transition,
        },
      }}
      {...props}
    />
  );
};

const VoidWidgetItemMain: FC<{id: string}> = ({id}) => {
  const {setNodeRef} = useDroppable({id});
  const [data] = useStorage();

  return (
    <Box
      ref={setNodeRef}
      sx={{
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: data.settings.dashboard.size,
        }}
      />
    </Box>
  );
};

const VoidWidgetItemToolbar: FC<{id: string}> = ({id}) => {
  const {setNodeRef} = useDroppable({id});
  return (
    <Box
      ref={setNodeRef}
      sx={{
        position: 'relative',
        width: '40px',
        height: '40px',
      }}
    />
  );
};

export const SortableWidgetContainer: FC<WidgetContainerProps> = ({
  id,
  setEditDialog,
  ...props
}) => {
  const [data, setData] = useStorage();

  return (
    <SortableContext id={id} items={data.widgets[id].c!}>
      {data.widgets[id].c!.length > 0 ? (
        data.widgets[id].c!.map((item, i) => (
          <SortableWidgetItem
            id={item}
            key={item}
            onEdit={() => setEditDialog(item)}
            onDelete={() =>
              setData((data) => {
                delete data.widgets[item];
                data.widgets[id].c!.splice(i, 1);
              })
            }
            onDuplicate={() =>
              setData((data) => {
                const newId = genId();
                data.widgets[newId] = data.widgets[item];
                data.widgets[id].c!.splice(i + 1, 0, newId);
              })
            }
            {...props}
          />
        ))
      ) : props.inToolbar ? (
        <VoidWidgetItemToolbar id={id} />
      ) : (
        <VoidWidgetItemMain id={id} />
      )}
    </SortableContext>
  );
};

export const SortableWidgetContext: FC = ({children}) => {
  const [data, setData] = useStorage();

  const [itemId, setItemId] = useState<string | null>(null);

  const findContainer = (id: string): string => {
    const containers = ['d', 'tl', 'tc', 'tr'];

    if (containers.includes(id)) return id;

    return containers.find((key) => data.widgets[key].c!.includes(id));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={(e) => setItemId(e.active.id)}
      sensors={sensors}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragEnd={(e) => {
        setItemId(null);

        if (e.over?.id && e.active.id !== e.over.id) {
          const activeContainer = findContainer(e.active.id);
          const overContainer = findContainer(e.over.id);

          if (activeContainer === overContainer) {
            const activeIndex = data.widgets[activeContainer].c!.indexOf(
              e.active.id,
            );
            const overIndex = data.widgets[overContainer].c!.indexOf(e.over.id);

            setData((data) => {
              data.widgets[overContainer].c = arrayMove(
                data.widgets[overContainer].c!,
                activeIndex,
                overIndex,
              );
            });
          }
        }
      }}
      onDragOver={(e) => {
        if (e.over?.id && e.active.id !== e.over.id) {
          const activeContainer = findContainer(e.active.id);
          const overContainer = findContainer(e.over.id);

          if (
            activeContainer !== overContainer &&
            // Edit and settings button stays in toolbar
            (overContainer !== 'd' || e.active.id !== 'm')
          ) {
            const activeIndex = data.widgets[activeContainer].c!.indexOf(
              e.active.id,
            );
            const overIndex = data.widgets[overContainer].c!.indexOf(e.over.id);

            const isBelowOverItem =
              e.over &&
              e.active.rect.current.translated &&
              e.active.rect.current.translated.top >
                e.over.rect.top + e.over.rect.height;

            const modifier = isBelowOverItem ? 1 : 0;

            const newIndex =
              overIndex >= 0
                ? overIndex + modifier
                : data.widgets[overContainer].c!.length + 1;

            setData((data) => {
              data.widgets[overContainer].c!.splice(
                newIndex,
                0,
                data.widgets[activeContainer].c![activeIndex],
              );
              data.widgets[activeContainer].c!.splice(
                data.widgets[activeContainer].c!.indexOf(e.active.id),
                1,
              );
            });
          }
        }
      }}
    >
      {children}
      <DragOverlay>
        {itemId && (
          <WidgetItem
            editMode
            id={itemId}
            inToolbar={!data.widgets.d.c!.includes(itemId)}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
};
