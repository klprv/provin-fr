export default function Hero() {
  return (
    <section className="min-h-screen flex items-center">
      <div className="w-full">
        <h1 className="font-serif text-[56px] md:text-[96px] leading-[1.05] tracking-[-0.02em] text-ink">
          Killian Provin
        </h1>

        <hr className="mt-6 w-16 h-px border-0 bg-ink" />

        <p className="mt-5 text-[12px] uppercase tracking-[0.15em] text-muted">
          Cryptography <span aria-hidden="true">·</span> Researcher{" "}
          <span aria-hidden="true">·</span> Paris
        </p>

        <p className="mt-8 text-[17px] max-w-[52ch] text-[#3a3a3a]">

        </p>
      </div>
    </section>
  );
}
