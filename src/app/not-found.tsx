import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70svh] flex-col items-center justify-center gap-6 py-24 text-center">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-accent-soft">Error 404</p>
      <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">This page isn&apos;t in the lab.</h1>
      <p className="max-w-md text-muted">The page you are looking for may have moved, or never existed.</p>
      <Link href="/" className="btn-gradient inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to home
      </Link>
    </section>
  );
}
