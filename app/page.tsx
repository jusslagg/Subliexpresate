"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: string;
  description: string;
  category: string;
  image: string;
};

type ProductForm = {
  name: string;
  price: string;
  description: string;
  category: string;
  image: File | null;
};

const featuredProducts = [
  {
    name: "Tazas personalizadas",
    price: "$8.500",
    description: "Tu foto, frase o ilustracion favorita en una taza lista para regalar.",
    gradient: "from-fuchsia-500 via-violet-500 to-cyan-400",
    icon: "TA"
  },
  {
    name: "Remeras sublimadas",
    price: "$15.900",
    description: "Prendas con identidad propia para eventos, marcas y momentos especiales.",
    gradient: "from-cyan-400 via-sky-500 to-violet-500",
    icon: "RE"
  },
  {
    name: "Pines personalizados",
    price: "$2.900",
    description: "Pequenos detalles con mucho caracter para mochilas, ferias y kits.",
    gradient: "from-violet-600 via-fuchsia-500 to-pink-400",
    icon: "PI"
  },
  {
    name: "Llaveros",
    price: "$3.500",
    description: "Recuerdos practicos, brillantes y listos para acompanar todos los dias.",
    gradient: "from-slate-900 via-violet-700 to-cyan-400",
    icon: "LL"
  },
  {
    name: "Almohadones",
    price: "$12.400",
    description: "Textiles suaves con disenos que convierten cualquier rincon en historia.",
    gradient: "from-fuchsia-500 via-rose-400 to-cyan-300",
    icon: "AL"
  }
];

const benefits = [
  "Personalizacion rapida",
  "Productos unicos",
  "Ideal para regalos y emprendimientos"
];

const emptyForm: ProductForm = {
  name: "",
  price: "",
  description: "",
  category: "Regalos",
  image: null
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setForm((current) => ({ ...current, image: file }));
    setPreview(file ? URL.createObjectURL(file) : "");
    setError("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.price.trim() || !form.description.trim() || !form.image) {
      setError("Completa nombre, precio, descripcion e imagen para publicar tu producto.");
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      name: form.name.trim(),
      price: form.price.trim(),
      description: form.description.trim(),
      category: form.category,
      image: URL.createObjectURL(form.image)
    };

    setProducts((current) => [newProduct, ...current]);
    setForm(emptyForm);
    setPreview("");
    setError("");
    event.currentTarget.reset();
  };

  const heroMotion = scrollProgress * 90;
  const reverseMotion = scrollProgress * -70;

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#17131f]">
      <div
        className="fixed left-0 top-0 z-50 h-1 bg-gradient-to-r from-cyan-300 via-fuchsia-500 to-violet-700 shadow-[0_0_24px_rgba(217,70,239,0.85)] transition-[width]"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <header className="sticky top-0 z-40 border-b border-white/50 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#" className="text-xl font-black tracking-normal text-violet-700">
            Subliexpresate
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-700 md:flex">
            <a className="transition hover:text-fuchsia-600" href="#beneficios">Beneficios</a>
            <a className="transition hover:text-fuchsia-600" href="#productos">Productos</a>
            <a className="transition hover:text-fuchsia-600" href="#cargar">Cargar producto</a>
            <a className="transition hover:text-fuchsia-600" href="#contacto">Contacto</a>
          </nav>
          <a
            href="#cargar"
            className="shine-button rounded-lg bg-slate-950 px-4 py-2 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-fuchsia-600"
          >
            Crear diseno
          </a>
        </div>
      </header>

      <section className="relative min-h-[calc(100vh-76px)]">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(42,16,90,0.98),rgba(201,36,184,0.88),rgba(34,211,238,0.78))]" />
        <div className="hero-grid absolute inset-0 opacity-45" />
        <div
          className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-cyan-300/35 blur-3xl"
          style={{ transform: `translateY(${heroMotion * 0.55}px)` }}
        />
        <div
          className="pointer-events-none absolute right-0 top-24 h-80 w-80 rounded-full bg-fuchsia-400/35 blur-3xl"
          style={{ transform: `translateY(${reverseMotion}px)` }}
        />

        <div className="relative mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="z-10 max-w-2xl text-white">
            <p className="scroll-reveal mb-4 inline-flex rounded-lg border border-white/25 bg-white/15 px-3 py-1 text-sm font-bold backdrop-blur">
              Sublimacion express con alma de regalo
            </p>
            <h1 className="scroll-reveal text-5xl font-black leading-tight tracking-normal sm:text-6xl lg:text-8xl">
              Subliexpresate
            </h1>
            <p className="scroll-reveal mt-6 text-xl font-medium leading-8 text-white/92 sm:text-2xl">
              Converti tus fotos, frases e ideas en productos personalizados unicos.
            </p>
            <div className="scroll-reveal mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#cargar"
                className="shine-button rounded-lg bg-white px-6 py-3 text-center font-black text-violet-700 shadow-glow transition hover:-translate-y-1 hover:bg-cyan-100"
              >
                Crear mi diseno
              </a>
              <a
                href="#productos"
                className="rounded-lg border border-white/40 bg-white/10 px-6 py-3 text-center font-black text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/20"
              >
                Ver productos
              </a>
            </div>
          </div>

          <div
            className="floating-card relative z-10 pb-8 lg:pb-0"
            style={{ transform: `translateY(${heroMotion * 0.25}px) rotate(${scrollProgress * 2}deg)` }}
          >
            <div className="absolute -inset-3 rounded-lg bg-white/25 blur-xl" />
            <img
              src="/assets/subliexpresate-hero.png"
              alt="Productos personalizados de sublimacion"
              className="relative aspect-[4/3] w-full rounded-lg object-cover shadow-[0_35px_90px_rgba(15,23,42,0.35)]"
            />
            <div className="absolute -bottom-2 left-6 right-6 rounded-lg border border-white/25 bg-white/90 p-4 text-slate-950 shadow-soft backdrop-blur">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-fuchsia-600">Hoy se imprime</p>
              <p className="mt-1 text-lg font-black">Regalos, merch y recuerdos con identidad propia.</p>
            </div>
          </div>
        </div>
        <a href="#beneficios" className="scroll-cue absolute bottom-5 left-1/2 z-20 -translate-x-1/2 text-xs font-black uppercase tracking-[0.22em] text-white/90">
          Desliza
        </a>
      </section>

      <section id="beneficios" className="relative bg-white py-16 sm:py-20">
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-violet-50 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scroll-reveal max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-fuchsia-600">Por que elegirnos</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Ideas simples que se transforman en productos con impacto.
            </h2>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <article
                key={benefit}
                className="scroll-reveal group rounded-lg border border-slate-100 bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-2 hover:border-cyan-200 hover:shadow-glow"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-gradient-to-br from-violet-600 to-cyan-400 text-lg font-black text-white transition group-hover:rotate-6 group-hover:scale-110">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-xl font-black text-slate-950">{benefit}</h3>
                <p className="mt-3 leading-7 text-slate-600">
                  Produccion pensada para vender mejor, regalar mejor y mostrar tu estilo sin vueltas.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="productos" className="relative bg-slate-950 py-16 text-white sm:py-24">
        <div
          className="absolute inset-0 opacity-45"
          style={{
            backgroundPosition: `${scrollProgress * 220}px ${scrollProgress * -160}px`
          }}
        >
          <div className="hero-grid h-full w-full" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scroll-reveal flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-300">Catalogo estrella</p>
              <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">Productos destacados</h2>
            </div>
            <p className="max-w-xl leading-7 text-slate-300">
              Elegi una base, subinos tu idea y convertimos el detalle en una pieza lista para enamorar.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {featuredProducts.map((product, index) => (
              <article
                key={product.name}
                className="scroll-reveal product-card group rounded-lg border border-white/10 bg-white p-3 text-slate-950 shadow-soft transition duration-300 hover:-translate-y-3 hover:rotate-1 hover:shadow-glow"
                style={{
                  transitionDelay: `${index * 70}ms`,
                  transform: `translateY(${(index % 2 === 0 ? 1 : -1) * scrollProgress * 18}px)`
                }}
              >
                <div className={`relative grid aspect-[4/3] place-items-center overflow-hidden rounded-lg bg-gradient-to-br ${product.gradient} p-4 text-center text-lg font-black text-white`}>
                  <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.35),transparent)] opacity-0 transition group-hover:translate-x-full group-hover:opacity-100" />
                  <span className="text-5xl font-black text-white/90">{product.icon}</span>
                </div>
                <div className="p-2 pt-4">
                  <h3 className="text-lg font-black">{product.name}</h3>
                  <p className="mt-1 text-xl font-black text-fuchsia-600">{product.price}</p>
                  <p className="mt-3 min-h-24 text-sm leading-6 text-slate-600">{product.description}</p>
                  <a
                    href="#cargar"
                    className="mt-4 inline-flex w-full justify-center rounded-lg bg-violet-700 px-4 py-2 text-sm font-black text-white transition group-hover:bg-fuchsia-600"
                  >
                    Personalizar
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="cargar" className="relative bg-white py-16 sm:py-24">
        <div
          className="pointer-events-none absolute right-[-8rem] top-24 h-72 w-72 rounded-full bg-cyan-200/50 blur-3xl"
          style={{ transform: `translateY(${reverseMotion * 0.5}px)` }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="scroll-reveal lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-700">Tu catalogo crece aca</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Carga tu producto
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              Publica una idea nueva en segundos: nombre claro, precio atractivo, una descripcion vendedora y una foto que lo haga brillar.
            </p>
            <div className="floating-card mt-7 rounded-lg bg-gradient-to-br from-violet-700 via-fuchsia-600 to-cyan-400 p-6 text-white shadow-glow">
              <p className="text-2xl font-black">Microcopy que vende</p>
              <p className="mt-3 leading-7 text-white/90">
                Los productos personalizados se compran con emocion. Mostra para quien es, cuando regalarlo y por que no se consigue igual en otro lado.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="scroll-reveal rounded-lg border border-slate-100 bg-white p-5 shadow-soft sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-bold text-slate-700">Nombre del producto</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleFieldChange}
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100"
                  placeholder="Taza Dia de la Madre"
                />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-slate-700">Precio</span>
                <input
                  name="price"
                  value={form.price}
                  onChange={handleFieldChange}
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100"
                  placeholder="$9.900"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-bold text-slate-700">Descripcion</span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFieldChange}
                  rows={4}
                  className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100"
                  placeholder="Contanos por que es especial, para quien funciona y que detalle lo hace unico."
                />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-slate-700">Categoria</span>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleFieldChange}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100"
                >
                  <option>Regalos</option>
                  <option>Indumentaria</option>
                  <option>Eventos</option>
                  <option>Emprendimientos</option>
                  <option>Souvenirs</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-bold text-slate-700">Imagen</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-2 w-full rounded-lg border border-dashed border-slate-300 px-4 py-3 text-sm outline-none transition file:mr-3 file:rounded-lg file:border-0 file:bg-cyan-100 file:px-3 file:py-2 file:font-bold file:text-cyan-800 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100"
                />
              </label>
            </div>

            <div className="mt-5 overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
              {preview ? (
                <img src={preview} alt="Vista previa del producto" className="h-64 w-full object-cover" />
              ) : (
                <div className="preview-pulse grid h-64 place-items-center bg-[linear-gradient(135deg,rgba(124,58,237,0.10),rgba(34,211,238,0.16))] px-6 text-center font-bold text-slate-500">
                  La vista previa de tu imagen aparece aca
                </div>
              )}
            </div>

            {error ? <p className="mt-4 rounded-lg bg-fuchsia-50 px-4 py-3 text-sm font-bold text-fuchsia-700">{error}</p> : null}

            <button
              type="submit"
              className="shine-button mt-5 w-full rounded-lg bg-gradient-to-r from-violet-700 via-fuchsia-600 to-cyan-500 px-6 py-3 font-black text-white shadow-glow transition hover:-translate-y-1 hover:brightness-110"
            >
              Publicar producto
            </button>
          </form>
        </div>
      </section>

      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scroll-reveal flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-fuchsia-600">Hechos por la comunidad</p>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
                Productos creados por usuarios
              </h2>
            </div>
            <p className="max-w-lg leading-7 text-slate-600">
              Cada publicacion suma una nueva opcion personalizada al escaparate.
            </p>
          </div>

          {products.length ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <article key={product.id} className="scroll-reveal rounded-lg bg-white p-4 shadow-soft transition hover:-translate-y-2 hover:shadow-glow">
                  <img src={product.image} alt={product.name} className="aspect-[4/3] w-full rounded-lg object-cover" />
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-600">{product.category}</p>
                      <h3 className="mt-2 text-xl font-black text-slate-950">{product.name}</h3>
                    </div>
                    <p className="shrink-0 rounded-lg bg-fuchsia-50 px-3 py-2 font-black text-fuchsia-700">{product.price}</p>
                  </div>
                  <p className="mt-3 leading-7 text-slate-600">{product.description}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="scroll-reveal mt-10 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center shadow-soft">
              <p className="text-xl font-black text-slate-950">Todavia no hay productos publicados.</p>
              <p className="mt-2 text-slate-600">Carga el primero y dale vida al catalogo.</p>
            </div>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        <div
          className="absolute inset-x-0 top-1/2 h-36 -translate-y-1/2 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 opacity-95"
          style={{ transform: `translateY(calc(-50% + ${reverseMotion * 0.2}px)) rotate(-2deg)` }}
        />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="scroll-reveal rounded-lg bg-white/92 px-5 py-10 shadow-glow backdrop-blur sm:px-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-600">Regalos con historia</p>
            <h2 className="mt-3 text-4xl font-black tracking-normal text-slate-950 sm:text-6xl">
              Regala algo que no existe en ningun local
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Para cumpleanos, aniversarios, egresos, fechas especiales o kits de emprendimiento: cada producto puede llevar una foto, una frase, una identidad visual o ese detalle que hace que alguien diga "esto lo hicieron pensando en mi".
            </p>
            <a
              href="#cargar"
              className="shine-button mt-8 inline-flex rounded-lg bg-slate-950 px-7 py-3 font-black text-white shadow-soft transition hover:-translate-y-1 hover:bg-violet-700"
            >
              Crear una pieza unica
            </a>
          </div>
        </div>
      </section>

      <footer id="contacto" className="bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-2xl font-black text-cyan-300">Subliexpresate</p>
            <p className="mt-2 text-slate-300">Sublimacion, regalos personalizados y productos para emprendedores.</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-bold text-slate-200">
            <a className="rounded-lg border border-white/15 px-4 py-2 transition hover:border-fuchsia-400 hover:text-fuchsia-300" href="#">Instagram</a>
            <a className="rounded-lg border border-white/15 px-4 py-2 transition hover:border-fuchsia-400 hover:text-fuchsia-300" href="#">Facebook</a>
            <a className="rounded-lg border border-white/15 px-4 py-2 transition hover:border-fuchsia-400 hover:text-fuchsia-300" href="mailto:hola@subliexpresate.com">hola@subliexpresate.com</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
