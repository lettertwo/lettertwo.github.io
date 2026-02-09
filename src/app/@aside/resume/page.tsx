import { frontmatter } from "@/app/resume.mdx";
import ContactAside from "@/components/ContactAside";
import DownloadIcon from "@/icons/DownloadIcon";

export default function ResumeContactAside() {
  return (
    <ContactAside frontmatter={frontmatter}>
      <li className="download-link">
        <DownloadIcon />
        <a href="/resume.pdf">Download</a>
      </li>
    </ContactAside>
  );
}
