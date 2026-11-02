/** Fixed, decorative backdrop: a faint grid plus two slow-drifting brand glows. Pure CSS, no JavaScript. */
export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0 opacity-70" />
      <div className="ambient-glow absolute -left-40 top-[-10rem] h-[32rem] w-[32rem] rounded-full bg-accent/20 blur-[120px]" />
      <div className="ambient-glow-delayed absolute -right-40 top-[30%] h-[28rem] w-[28rem] rounded-full bg-violet/20 blur-[120px]" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
