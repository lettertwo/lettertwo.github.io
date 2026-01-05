import ExternalLink from "@/components/ExternalLink";

import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ExternalLink,
    ...components,
  };
}
