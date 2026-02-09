import type { Metadata } from "next";
import Resume, { frontmatter } from "@/app/resume.mdx";
import "./resume.css";

export const metadata: Metadata = {
  title: `${frontmatter.title} - ${frontmatter.description} - Resume and CV`,
  description: `${frontmatter.summary}`,
  openGraph: {
    title: `${frontmatter.title} - ${frontmatter.description} - Resume and CV`,
    description: `${frontmatter.summary}`,
    url: frontmatter.url,
  },
};

function slugify(text: React.ReactNode): string | undefined {
  if (typeof text === "string") {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
}

function CustomH2({ children }: { children: React.ReactNode }) {
  return <h2 id={slugify(children)}>{children}</h2>;
}

const overrideComponents = {
  h2: CustomH2,
};

export default function ResumeMain() {
  return (
    <>
      <header>
        <h1>{frontmatter.title}</h1>
        <p>{frontmatter.description}</p>
      </header>
      <article>
        <h2>Summary</h2>
        <p>{frontmatter.summary}</p>
      </article>
      <main>
        <Resume components={overrideComponents} />
      </main>
    </>
  );
}
