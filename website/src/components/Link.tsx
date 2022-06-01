import * as React from 'react';
import {useRouter} from 'next/router';
import {LinkProps as NextLinkProps} from 'next/link';
import {Link as MuiLink, LinkProps as MuiLinkProps} from '@mui/material';
import {NextLinkComposed, NextLinkComposedProps} from './NextLinkComposed';

export type LinkProps = {
  as?: NextLinkProps['as'];
  href: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
  noLinkStyle?: boolean;
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
  Omit<MuiLinkProps, 'href'>;

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const {as: linkAs, className, href, noLinkStyle, role, ...other} = props;

  const router = useRouter();
  const pathname = typeof href === 'string' ? href : href.pathname;

  return (
    <MuiLink
      className={className}
      component={NextLinkComposed}
      linkAs={linkAs}
      ref={ref}
      to={href}
      {...other}
    />
  );
});

export default Link;
