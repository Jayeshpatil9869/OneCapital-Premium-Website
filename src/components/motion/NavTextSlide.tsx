import { prefersReducedMotion } from "@/src/lib/motion";

type NavTextSlideProps = {
  label: string;
};

/** Whole-word slide. Two stacked copies, clipped to one line, move up together on hover. */
export function NavTextSlide({ label }: NavTextSlideProps) {
  if (prefersReducedMotion()) {
    return <span>{label}</span>;
  }

  return (
    <span className="relative block h-[1lh] overflow-hidden leading-none">
      <span className="sr-only">{label}</span>
      <span
        aria-hidden
        className="block transition-transform duration-300 ease-out group-hover:-translate-y-1/2 group-focus-visible:-translate-y-1/2 motion-reduce:transition-none motion-reduce:transform-none"
      >
        <span className="block">{label}</span>
        <span className="block">{label}</span>
      </span>
    </span>
  );
}
