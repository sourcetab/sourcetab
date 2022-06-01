import {forwardRef} from 'react';
import {LinkProps as NextLinkProps} from 'next/link';
import {IconButton, IconButtonProps} from '@mui/material';
import {NextLinkComposed, NextLinkComposedProps} from './NextLinkComposed';

export type IconButtonLinkProps = {
  as?: NextLinkProps['as'];
  href: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
  noLinkStyle?: boolean;
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
  Omit<IconButtonProps, 'href'>;

const IconButtonLink = forwardRef<HTMLAnchorElement, IconButtonLinkProps>(
  ({as: linkAs, className, href, noLinkStyle, role, ...other}, ref) => (
    <IconButton
      className={className}
      component={NextLinkComposed}
      linkAs={linkAs}
      // @ts-expect-error
      ref={ref}
      to={href}
      {...other}
    />
  ),
);

export default IconButtonLink;
