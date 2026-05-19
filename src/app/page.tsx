import Hero from "@/components/Hero";

const placeholderSections = [
  { id: "publications", label: "PUBLICATIONS" },
  { id: "projects", label: "PROJECTS" },
  { id: "cv", label: "CV" },
  { id: "contact", label: "CONTACT" },
] as const;

export default function Page() {
  return (
    <>
      <div id="readme">
        <Hero />
      </div>
      {placeholderSections.map(({ id, label }) => (
        <section
          key={id}
          id={id}
          className="min-h-[60vh] flex items-center"
        >
          <p className="section-label font-sans text-[12px] uppercase tracking-[0.15em] text-muted">
            {label}
          </p>
        </section>
      ))}
    </>
  );
}
