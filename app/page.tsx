"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: string;
  description: string;
  category: string;
  image: string;
  templateId: string;
  color: string;
};

type ProductForm = {
  name: string;
  description: string;
  image: File | null;
};

const featuredProducts = [
  {
    id: "taza",
    name: "Tazas personalizadas",
    price: "$8.500",
    description: "Tu foto, frase o ilustracion favorita en una taza lista para regalar.",
    gradient: "from-fuchsia-500 via-violet-500 to-cyan-400",
    icon: "TA",
    mockup: "taza"
  },
  {
    id: "remera",
    name: "Remeras sublimadas",
    price: "$15.900",
    description: "Prendas con identidad propia para eventos, marcas y momentos especiales.",
    gradient: "from-cyan-400 via-sky-500 to-violet-500",
    icon: "RE",
    mockup: "remera"
  },
  {
    id: "buzo",
    name: "Buzos personalizados",
    price: "$24.900",
    description: "Abrigo con disenos propios para equipos, promos, marcas y regalos especiales.",
    gradient: "from-violet-600 via-fuchsia-500 to-pink-400",
    icon: "BU",
    mockup: "buzo"
  },
  {
    id: "campera",
    name: "Camperas sublimadas",
    price: "$32.900",
    description: "Prendas protagonistas para destacar tu identidad en eventos y emprendimientos.",
    gradient: "from-slate-900 via-violet-700 to-cyan-400",
    icon: "CA",
    mockup: "campera"
  },
  {
    id: "uniforme",
    name: "Uniformes personalizados",
    price: "$28.500",
    description: "Imagen profesional para comercios, equipos de trabajo y proyectos que crecen.",
    gradient: "from-fuchsia-500 via-rose-400 to-cyan-300",
    icon: "UN",
    mockup: "uniforme"
  }
];

const benefits = [
  "Personalizacion rapida",
  "Productos unicos",
  "Ideal para regalos y emprendimientos"
];

const emptyForm: ProductForm = {
  name: "",
  description: "",
  image: null
};

const mockupColors = [
  { name: "Blanco", value: "#ffffff" },
  { name: "Negro suave", value: "#17131f" },
  { name: "Violeta", value: "#6d28d9" },
  { name: "Fucsia", value: "#d946ef" },
  { name: "Cyan", value: "#22d3ee" },
  { name: "Gris jaspeado", value: "#cbd5e1" }
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/Subliexpresate";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(featuredProducts[1]);
  const [mockupColor, setMockupColor] = useState(mockupColors[0].value);

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
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

    if (!form.name.trim() || !form.description.trim() || !form.image) {
      setError("Completa nombre, precio, descripcion e imagen para publicar tu producto.");
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      name: form.name.trim(),
      price: selectedProduct.price,
      description: form.description.trim(),
      category: selectedProduct.name,
      image: URL.createObjectURL(form.image),
      templateId: selectedProduct.id,
      color: mockupColor
    };

    setProducts((current) => [newProduct, ...current]);
    setForm(emptyForm);
    setPreview("");
    setError("");
    event.currentTarget.reset();
  };

  const handleTemplateSelect = (product: typeof featuredProducts[number]) => {
    setSelectedProduct(product);
    setError("");
    document.getElementById("cargar")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const renderMockup = (image?: string, compact = false) => {
    const isMug = selectedProduct.mockup === "taza";
    const isJacket = selectedProduct.mockup === "campera";
    const isHoodie = selectedProduct.mockup === "buzo";
    const isUniform = selectedProduct.mockup === "uniforme";
    const isTshirt = selectedProduct.mockup === "remera";

    if (isMug) {
      return (
        <div className={`${compact ? "h-56" : "h-72"} relative grid place-items-center overflow-hidden rounded-lg bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.22),transparent_32rem),#f8fafc]`}>
          <div className="absolute bottom-7 h-5 w-48 rounded-full bg-slate-900/10 blur-sm" />
          <div
            className="relative h-36 w-44 rounded-b-[2rem] rounded-t-lg border border-slate-200 shadow-soft"
            style={{ backgroundColor: mockupColor }}
          >
            <div className="absolute -right-10 top-8 h-20 w-14 rounded-r-full border-[12px] border-l-0 border-slate-300" />
            <div className="absolute left-1/2 top-8 h-20 w-24 -translate-x-1/2 overflow-hidden rounded-lg border border-slate-200 bg-white/80">
              {image ? (
                <img src={image} alt="Diseno cargado sobre taza" className="h-full w-full object-cover" />
              ) : (
                <span className="grid h-full place-items-center px-2 text-center text-xs font-black text-slate-400">Tu imagen</span>
              )}
            </div>
          </div>
        </div>
      );
    }

    const printTop = isHoodie ? "top-[128px]" : isJacket ? "top-[122px]" : "top-[118px]";
    const printSize = isUniform ? "h-24 w-24" : "h-28 w-28";
    const garmentLabel = isTshirt
      ? "remera"
      : isHoodie
        ? "buzo"
        : isJacket
          ? "campera"
          : "uniforme";

    return (
      <div className={`${compact ? "h-64" : "h-80"} relative grid place-items-center overflow-hidden rounded-lg bg-[radial-gradient(circle_at_top,rgba(217,70,239,0.18),transparent_28rem),#f8fafc]`}>
        <div className="absolute bottom-8 h-7 w-72 rounded-full bg-slate-900/12 blur-xl" />
        <div className="relative h-[310px] w-[360px] max-w-full">
          <svg
            viewBox="0 0 420 360"
            className="absolute inset-0 h-full w-full drop-shadow-[0_24px_24px_rgba(15,23,42,0.16)]"
            role="img"
            aria-label={`Mockup realista de ${garmentLabel}`}
          >
            <defs>
              <filter id={`fabric-shadow-${selectedProduct.id}`} x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="14" stdDeviation="10" floodColor="#0f172a" floodOpacity="0.18" />
              </filter>
              <linearGradient id={`fabric-light-${selectedProduct.id}`} x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.32" />
                <stop offset="42%" stopColor="#ffffff" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
              </linearGradient>
              <pattern id={`fabric-texture-${selectedProduct.id}`} width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M0 3 H8 M3 0 V8" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="0.7" />
              </pattern>
            </defs>

            {isHoodie ? (
              <path
                d="M154 116 C158 70 183 45 211 45 C239 45 264 70 268 116 C253 104 236 98 211 98 C186 98 169 104 154 116Z"
                fill={mockupColor}
                stroke="rgba(15,23,42,0.14)"
                strokeWidth="2"
              />
            ) : null}

            {isJacket ? (
              <>
                <path
                  d="M146 104 C164 91 183 86 210 86 C237 86 256 91 274 104 L318 130 C327 136 330 147 326 157 L289 261 C286 270 278 276 269 276 H151 C142 276 134 270 131 261 L94 157 C90 147 93 136 102 130Z"
                  fill={mockupColor}
                  filter={`url(#fabric-shadow-${selectedProduct.id})`}
                />
                <path d="M210 96 V276" stroke="rgba(255,255,255,0.58)" strokeWidth="3" />
                <path d="M194 100 L210 134 L226 100" fill="rgba(255,255,255,0.24)" />
              </>
            ) : (
              <path
                d={
                  isUniform
                    ? "M145 102 C165 88 184 82 210 82 C236 82 255 88 275 102 L327 138 C337 145 339 159 332 169 L297 219 L280 206 L269 286 C268 296 260 303 250 303 H170 C160 303 152 296 151 286 L140 206 L123 219 L88 169 C81 159 83 145 93 138Z"
                    : "M146 103 C166 90 185 84 210 84 C235 84 254 90 274 103 L330 136 C340 142 343 156 337 166 L304 219 C299 227 289 230 281 225 L269 216 L260 293 C259 303 251 310 241 310 H179 C169 310 161 303 160 293 L151 216 L139 225 C131 230 121 227 116 219 L83 166 C77 156 80 142 90 136Z"
                }
                fill={mockupColor}
                filter={`url(#fabric-shadow-${selectedProduct.id})`}
              />
            )}

            <path
              d={
                isHoodie
                  ? "M146 116 C165 105 184 100 210 100 C236 100 255 105 274 116 L318 139 C328 144 333 156 329 167 L296 258 C292 269 283 276 271 276 H149 C137 276 128 269 124 258 L91 167 C87 156 92 144 102 139Z"
                  : isJacket
                    ? "M146 104 C164 91 183 86 210 86 C237 86 256 91 274 104 L318 130 C327 136 330 147 326 157 L289 261 C286 270 278 276 269 276 H151 C142 276 134 270 131 261 L94 157 C90 147 93 136 102 130Z"
                    : isUniform
                      ? "M145 102 C165 88 184 82 210 82 C236 82 255 88 275 102 L327 138 C337 145 339 159 332 169 L297 219 L280 206 L269 286 C268 296 260 303 250 303 H170 C160 303 152 296 151 286 L140 206 L123 219 L88 169 C81 159 83 145 93 138Z"
                      : "M146 103 C166 90 185 84 210 84 C235 84 254 90 274 103 L330 136 C340 142 343 156 337 166 L304 219 C299 227 289 230 281 225 L269 216 L260 293 C259 303 251 310 241 310 H179 C169 310 161 303 160 293 L151 216 L139 225 C131 230 121 227 116 219 L83 166 C77 156 80 142 90 136Z"
              }
              fill={`url(#fabric-light-${selectedProduct.id})`}
            />
            <path
              d={
                isHoodie
                  ? "M146 116 C165 105 184 100 210 100 C236 100 255 105 274 116 L318 139 C328 144 333 156 329 167 L296 258 C292 269 283 276 271 276 H149 C137 276 128 269 124 258 L91 167 C87 156 92 144 102 139Z"
                  : "M146 103 C166 90 185 84 210 84 C235 84 254 90 274 103 L330 136 C340 142 343 156 337 166 L304 219 C299 227 289 230 281 225 L269 216 L260 293 C259 303 251 310 241 310 H179 C169 310 161 303 160 293 L151 216 L139 225 C131 230 121 227 116 219 L83 166 C77 156 80 142 90 136Z"
              }
              fill={`url(#fabric-texture-${selectedProduct.id})`}
            />

            <path
              d="M179 94 C188 113 199 122 210 122 C221 122 232 113 241 94"
              fill="none"
              stroke="rgba(255,255,255,0.58)"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path
              d="M184 93 C193 105 201 111 210 111 C219 111 227 105 236 93"
              fill="none"
              stroke="rgba(15,23,42,0.22)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {isHoodie ? (
              <>
                <path d="M184 118 C192 139 201 151 210 151 C219 151 228 139 236 118" fill="none" stroke="rgba(255,255,255,0.32)" strokeWidth="3" />
                <path d="M199 122 C195 147 191 161 184 178" fill="none" stroke="rgba(255,255,255,0.48)" strokeWidth="2" strokeLinecap="round" />
                <path d="M221 122 C225 147 229 161 236 178" fill="none" stroke="rgba(255,255,255,0.48)" strokeWidth="2" strokeLinecap="round" />
              </>
            ) : null}
            {isUniform ? (
              <>
                <path d="M180 101 L210 136 L240 101" fill="rgba(255,255,255,0.28)" />
                <path d="M177 101 L210 139 L243 101" fill="none" stroke="rgba(15,23,42,0.16)" strokeWidth="2" />
              </>
            ) : null}
          </svg>

          <div className={`absolute left-1/2 ${printTop} ${printSize} -translate-x-1/2 overflow-hidden rounded-md border border-white/70 bg-white/85 shadow-[0_10px_28px_rgba(15,23,42,0.18)] ring-1 ring-slate-900/10`}>
            {image ? (
              <img src={image} alt={`Diseno cargado sobre ${garmentLabel}`} className="h-full w-full object-cover opacity-95 mix-blend-normal" />
            ) : (
              <span className="grid h-full place-items-center px-2 text-center text-xs font-black text-slate-400">Tu imagen</span>
            )}
          </div>
        </div>
      </div>
    );
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
              src={`${basePath}/assets/subliexpresate-hero.png`}
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
                className={`scroll-reveal product-card group rounded-lg border bg-white p-3 text-slate-950 shadow-soft transition duration-300 hover:-translate-y-3 hover:rotate-1 hover:shadow-glow ${selectedProduct.id === product.id ? "border-cyan-300 ring-4 ring-cyan-300/30" : "border-white/10"}`}
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
                  <button
                    type="button"
                    onClick={() => handleTemplateSelect(product)}
                    className="mt-4 inline-flex w-full justify-center rounded-lg bg-violet-700 px-4 py-2 text-sm font-black text-white transition group-hover:bg-fuchsia-600"
                  >
                    {selectedProduct.id === product.id ? "Seleccionado" : "Personalizar"}
                  </button>
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
              Publica una idea nueva en segundos. El precio lo define el administrador desde la plantilla elegida y el cliente solo carga su diseno.
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
                  value={selectedProduct.price}
                  readOnly
                  className="mt-2 w-full rounded-lg border border-cyan-200 bg-cyan-50 px-4 py-3 font-black text-cyan-800 outline-none"
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
                <span className="text-sm font-bold text-slate-700">Categoria seleccionada</span>
                <input
                  name="category"
                  value={selectedProduct.name}
                  readOnly
                  className="mt-2 w-full rounded-lg border border-violet-200 bg-violet-50 px-4 py-3 font-black text-violet-800 outline-none"
                />
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

            <div className="mt-5 rounded-lg border border-slate-100 bg-slate-50 p-3">
              <div className="mb-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-black text-slate-950">Mockup de {selectedProduct.name}</p>
                  <p className="text-sm text-slate-500">Cambia el color base y mira como combina con tu imagen.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mockupColors.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setMockupColor(color.value)}
                      title={color.name}
                      aria-label={`Usar color ${color.name}`}
                      className={`h-9 w-9 rounded-full border-2 shadow-sm transition hover:scale-110 ${mockupColor === color.value ? "border-fuchsia-500 ring-4 ring-fuchsia-100" : "border-white"}`}
                      style={{ backgroundColor: color.value }}
                    />
                  ))}
                </div>
              </div>
              {renderMockup(preview)}
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
