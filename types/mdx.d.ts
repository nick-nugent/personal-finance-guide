declare module "*.mdx" {
  import type { MDXContent } from "mdx/types";

  export const frontmatter: Record<string, unknown>;

  const Content: MDXContent;
  export default Content;
}
