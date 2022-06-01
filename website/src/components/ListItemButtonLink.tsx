import {forwardRef} from 'react';
import {LinkProps as NextLinkProps} from 'next/link';
import {ListItemButton, ListItemButtonProps} from '@mui/material';
import {NextLinkComposed, NextLinkComposedProps} from './NextLinkComposed';

export type ListItemButtonLinkProps = {
  as?: NextLinkProps['as'];
  href: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
  noLinkStyle?: boolean;
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
  Omit<ListItemButtonProps, 'href'>;

const ListItemButtonLink = forwardRef<
  HTMLAnchorElement,
  ListItemButtonLinkProps
>((props, ref) => {
  const {as: linkAs, className, href, noLinkStyle, role, ...other} = props;

  return (
    <ListItemButton
      className={className}
      component={NextLinkComposed}
      linkAs={linkAs}
      // @ts-expect-error
      ref={ref}
      to={href}
      {...other}
    />
  );
});

export default ListItemButtonLink;
