import {forwardRef} from 'react';
import NextLink, {LinkProps as NextLinkProps} from 'next/link';
import {styled} from '@mui/material/styles';

const Anchor = styled('a')({});

// @ts-expect-error
export interface NextLinkComposedProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Omit<NextLinkProps, 'href' | 'as'> {
  to: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
  href?: NextLinkProps['href'];
}

export const NextLinkComposed = forwardRef<
  HTMLAnchorElement,
  NextLinkComposedProps
>((props, ref) => {
  const {
    to,
    linkAs,
    href,
    replace,
    scroll,
    shallow,
    prefetch,
    locale,
    ...other
  } = props;

  return (
    <NextLink
      passHref
      as={linkAs}
      href={to}
      locale={locale}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
    >
      <Anchor ref={ref} {...other} />
    </NextLink>
  );
});
