interface Frontmatter {
  title: string;
  description: string;
  summary: string;
  url: string;
  website: string?;
  location: string?;
  email: string?;
  linkedin: string?;
  github: string?;
}

declare module "*.mdx" {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
  export const frontmatter: Frontmatter; // Declare the exported frontmatter
}
