export default function ExternalLink({
  href,
  children,
}: Readonly<{
  href: string;
  children: React.ReactNode;
}>) {
  return (
    <a
      href={href}
      data-label={href?.replace(/^https?:\/\//, "").replace(/\/$/, "")}
    >
      {children}
    </a>
  );
}
