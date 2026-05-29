const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/Subliexpresate";

export default function NotFound() {
  return (
    <main className="relative grid min-h-screen overflow-hidden bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(42,16,90,0.96),rgba(201,36,184,0.82),rgba(34,211,238,0.72))]" />
      <div className="hero-grid absolute inset-0 opacity-35" />
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-300/35 blur-3xl" />
      <div className="absolute -right-24 bottom-12 h-80 w-80 rounded-full bg-fuchsia-400/35 blur-3xl" />

      <section className="relative mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="scroll-reveal">
          <p className="inline-flex rounded-lg border border-white/25 bg-white/15 px-3 py-1 text-sm font-black uppercase tracking-[0.22em] backdrop-blur">
            Error 404
          </p>
          <h1 className="mt-5 text-5xl font-black leading-tight tracking-normal sm:text-7xl">
            Este diseño se perdió antes de sublimarse.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/88">
            La página que buscabas no está en el catálogo, pero podemos volver al inicio y crear algo mucho mejor.
          </p>
          <a
            href={`${basePath}/`}
            className="shine-button mt-8 inline-flex rounded-lg bg-white px-7 py-3 font-black text-violet-700 shadow-glow transition hover:-translate-y-1 hover:bg-cyan-100"
          >
            Volver a Subliexpresate
          </a>
        </div>

        <div className="floating-card relative">
          <div className="absolute -inset-4 rounded-lg bg-white/20 blur-2xl" />
          <img
            src={`${basePath}/assets/subliexpresate-hero.png`}
            alt="Productos personalizados de Subliexpresate"
            className="relative aspect-[4/3] w-full rounded-lg object-cover shadow-[0_35px_90px_rgba(15,23,42,0.42)]"
          />
          <div className="absolute -bottom-5 left-5 right-5 rounded-lg border border-white/30 bg-white/92 p-4 text-slate-950 shadow-soft backdrop-blur">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-fuchsia-600">Ruta no encontrada</p>
            <p className="mt-1 text-lg font-black">Hasta los errores pueden tener buena presentacion.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
