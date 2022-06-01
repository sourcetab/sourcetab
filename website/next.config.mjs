import nextMdx from '@next/mdx';
import rehypeSlug from 'rehype-slug';

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypeSlug],
  },
});

export default withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
});
