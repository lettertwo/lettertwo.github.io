import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "lettertwo dot page",
  description: "the place where i put that thing that one time",
};

export default function HomeMain() {
  return (
    <main>
      <header>
        <h1>Hello world</h1>
      </header>
    </main>
  );
}
