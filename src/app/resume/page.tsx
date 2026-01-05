import ExternalLink from "@/components/ExternalLink";
import LocationIcon from "@/icons/LocationIcon";
import EmailIcon from "@/icons/EmailIcon";
import DownloadIcon from "@/icons/DownloadIcon";
import GlobeIcon from "@/icons/GlobeIcon";
import LinkedInIcon from "@/icons/LinkedInIcon";
import GithubIcon from "@/icons/GithubIcon";

import Resume, { frontmatter } from "./resume.mdx";
import StickyAsideObserver from "./StickyAsideObserver";

import "./resume.css";

import type { Metadata } from "next";

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

export default function Page() {
  return (
    <div className="resume-container">
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
      <aside>
        <StickyAsideObserver>
          <h1>{frontmatter.title}</h1>
          <p>{frontmatter.description}</p>
        </StickyAsideObserver>
        <ul className="contact-list">
          {frontmatter.location && (
            <li>
              <LocationIcon />
              <span>{frontmatter.location}</span>
            </li>
          )}
          {frontmatter.email && (
            <li>
              <EmailIcon />
              <a href={`mailto:${frontmatter.email}`}>{frontmatter.email}</a>
            </li>
          )}
          {frontmatter.website && (
            <li>
              <GlobeIcon />
              <ExternalLink href={frontmatter.website}>
                {frontmatter.website.replace(/^https?:\/\//, "")}
              </ExternalLink>
            </li>
          )}
          {frontmatter.linkedin && (
            <li>
              <LinkedInIcon />
              <ExternalLink href={frontmatter.linkedin}>LinkedIn</ExternalLink>
            </li>
          )}
          {frontmatter.github && (
            <li>
              <GithubIcon />
              <ExternalLink href={frontmatter.github}>GitHub</ExternalLink>
            </li>
          )}
          <li className="download-link">
            <DownloadIcon />
            <a href="/resume.pdf">Download</a>
          </li>
        </ul>
      </aside>
    </div>
  );
}
