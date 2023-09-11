import {Component, ComponentProps} from 'solid-js';
import {A} from 'solid-start';
import GitHubIcon from '~icons/simple-icons/github';

const HeaderItem: Component<{
  text: string;
  href: string;
  icon: Component<ComponentProps<'svg'>>;
}> = (props) => (
  <>
    <A
      class='hidden sm:inline-block link p-2 text-lg font-medium'
      href={props.href}
    >
      {props.text}
    </A>
    <A class='inline-block sm:hidden link p-2 w-11 h-11' href={props.href}>
      <props.icon height='100%' width='100%' />
    </A>
  </>
);

const Header: Component = () => {
  return (
    <header class='sticky top-0 flex justify-center backdrop-blur bg-white bg-opacity-70 dark:bg-slate-900 dark:bg-opacity-70'>
      <div class='flex items-center w-full max-w-7xl px-16 py-2'>
        <A class='link p-2 text-2xl font-extrabold tracking-tight' href='/'>
          Sourcetab
        </A>
        <div class='grow' />
        <HeaderItem
          text='GitHub'
          href='https://github.com/sourcetab/sourcetab'
          icon={GitHubIcon}
        />
      </div>
    </header>
  );
};

export default Header;
