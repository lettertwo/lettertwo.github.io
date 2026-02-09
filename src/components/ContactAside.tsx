import ExternalLink from "@/components/ExternalLink";
import EmailIcon from "@/icons/EmailIcon";
import GithubIcon from "@/icons/GithubIcon";
import GlobeIcon from "@/icons/GlobeIcon";
import LinkedInIcon from "@/icons/LinkedInIcon";
import LocationIcon from "@/icons/LocationIcon";
import StickyAsideObserver from "./StickyAsideObserver";
// import StickyAsideObserver from "@/app/resume/StickyAsideObserver";

export type ContactFrontmatter = {
  title?: string;
  description?: string;
  location?: string | null;
  email?: string | null;
  website?: string | null;
  github?: string | null;
  linkedin?: string | null;
};

type ContactAsideProps = {
  frontmatter: ContactFrontmatter;
  children?: React.ReactNode;
};

export default function ContactAside({
  frontmatter = {
    github: "https://github.com/lettertwo",
    linkedin: "https://linkedin.com/in/eeldredge/",
  },
  children,
}: ContactAsideProps) {
  return (
    <aside>
      {frontmatter.title && (
        <StickyAsideObserver>
          <h1>{frontmatter.title}</h1>
          {frontmatter.description && <p>{frontmatter.description}</p>}
        </StickyAsideObserver>
      )}
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
        {children}
      </ul>
    </aside>
  );
}
