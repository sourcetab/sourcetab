/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {Box, BoxProps, Typography} from '@mui/material';
import {forwardRef, useRef} from 'react';

import useStorage from '@/hooks/useStorage';
import widgets from '@/widgets';

import {WidgetEditMenu, WidgetEditMenuSmall} from './WidgetEditMenu';
import Menu from './Menu';

interface WidgetItemPropsInner {
  id: string;
  editMode?: boolean;
  rootProps?: BoxProps;
  innerProps?: BoxProps;
  setEditMode: (newValue: boolean) => void;
  setWidgetsDialog: (newValue: boolean) => void;
  setSettingsDialog: (newValue: boolean) => void;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export interface WidgetItemProps extends WidgetItemPropsInner {
  inToolbar?: boolean;
}

const WidgetItemMain = forwardRef<HTMLElement, WidgetItemPropsInner>(
  (
    {id, editMode, rootProps, innerProps, onEdit, onDuplicate, onDelete},
    ref,
  ) => {
    const [data, setData] = useStorage();

    if (
      !(
        data.widgets[id]?.t &&
        Object.prototype.hasOwnProperty.call(widgets, data.widgets[id].t)
      )
    ) {
      return null;
    }

    const Widget =
      id.length < 4 ? undefined : widgets[data.widgets[id].t].Widget;

    const WidgetEditMenuElement =
      data.settings.dashboard.size < 90 ? WidgetEditMenuSmall : WidgetEditMenu;

    const editMenu = (
      <WidgetEditMenuElement
        visible={editMode}
        {...{onEdit, onDuplicate, onDelete}}
      />
    );

    return (
      <Box
        key={id}
        ref={ref}
        {...rootProps}
        sx={{
          ...rootProps?.sx,
          position: 'relative',
          borderRadius: `${data.settings.dashboard.radius}px`,
        }}
      >
        <Box
          {...innerProps}
          sx={{
            ...innerProps?.sx,
            borderRadius: `${data.settings.dashboard.radius}px`,
            width: '100%',
            height: data.settings.dashboard.size,
          }}
        >
          {/* @ts-expect-error */}
          <Widget
            data={data.widgets[id].d}
            disable={editMode}
            globalData={data.settings.widgets[data.widgets[id].t]}
            // @ts-expect-error
            setData={(newValue) =>
              setData((data) => {
                data.widgets[id].d = newValue;
              })
            }
            // @ts-expect-error
            setGlobalData={(newValue) => {
              setData((data) => {
                data.settings.widgets[data.widgets[id].t] = newValue;
              });
            }}
          />
        </Box>
        <Typography
          sx={{
            width: '100%',
            textAlign: 'center',
            wordWrap: 'break-word',
          }}
        >
          {data.widgets[id].d.label}
        </Typography>
        {editMenu}
      </Box>
    );
  },
);

const WidgetItemToolbar = forwardRef<HTMLElement, WidgetItemPropsInner>(
  (
    {
      id,
      editMode,
      rootProps,
      innerProps,
      setEditMode,
      setWidgetsDialog,
      setSettingsDialog,
      onEdit,
      onDuplicate,
      onDelete,
    },
    ref,
  ) => {
    const [data, setData] = useStorage();

    const widgetRef = useRef<HTMLElement>();

    switch (id) {
      case 'm':
        return (
          <Menu
            key={id}
            // @ts-expect-error
            ref={ref}
            {...rootProps}
            {...innerProps}
            {...{editMode, setEditMode, setWidgetsDialog, setSettingsDialog}}
          />
        );

      default: {
        if (
          !(
            data.widgets[id]?.t &&
            Object.prototype.hasOwnProperty.call(widgets, data.widgets[id].t)
          )
        ) {
          return null;
        }
        const Widget =
          id.length < 4 ? undefined : widgets[data.widgets[id].t].Widget;

        const WidgetEditMenuElement =
          Boolean(widgetRef.current?.clientWidth) &&
          widgetRef.current!.clientWidth > 90
            ? WidgetEditMenu
            : WidgetEditMenuSmall;

        return (
          <Box {...rootProps} ref={ref} sx={{position: 'relative'}}>
            <Box {...innerProps} ref={widgetRef}>
              {/* @ts-expect-error */}
              <Widget
                inToolbar
                data={data.widgets[id].d}
                disable={editMode}
                globalData={data.settings.widgets[data.widgets[id].t]}
                key={id}
                // @ts-expect-error
                setData={(newValue) =>
                  setData((data) => {
                    data.widgets[id].d = newValue;
                  })
                }
                // @ts-expect-error
                setGlobalData={(newValue) => {
                  setData((data) => {
                    data.settings.widgets[data.widgets[id].t] = newValue;
                  });
                }}
              />
            </Box>
            <WidgetEditMenuElement
              visible={editMode}
              {...{onEdit, onDuplicate, onDelete}}
            />
          </Box>
        );
      }
    }
  },
);

const WidgetItem = forwardRef<HTMLElement, WidgetItemProps>(
  ({inToolbar, ...props}, ref) =>
    inToolbar ? (
      <WidgetItemToolbar {...{ref, ...props}} />
    ) : (
      <WidgetItemMain {...{ref, ...props}} />
    ),
);

export default WidgetItem;
