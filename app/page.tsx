const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.VERCEL === "1" ? "" : "/Subliexpresate");

const contactLinks = [
  {
    label: "WhatsApp",
    value: "11 5896-5675",
    href: "https://wa.me/1158965675",
    icon: "whatsapp"
  },
  {
    label: "Correo",
    value: "subliexpresate26@gmail.com",
    href: "mailto:subliexpresate26@gmail.com",
    icon: "gmail"
  }
];

function ContactIcon({ icon }: { icon: string }) {
  if (icon === "whatsapp") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-6 w-6">
        <path
          fill="#25D366"
          d="M16 3.5A12.3 12.3 0 0 0 5.5 25.3L4 30l4.9-1.4A12.3 12.3 0 1 0 16 3.5Z"
        />
        <path
          fill="#fff"
          d="M22.8 18.9c-.4-.2-2.4-1.2-2.8-1.3-.4-.1-.7-.2-1 .2-.3.4-1.1 1.3-1.3 1.6-.2.3-.5.3-.9.1a10 10 0 0 1-5-4.4c-.3-.5 0-.8.2-1 .2-.2.4-.5.6-.7.2-.3.3-.5.4-.8.1-.3 0-.6 0-.8-.1-.2-.9-2.1-1.2-2.9-.3-.7-.6-.6-1-.6h-.8c-.3 0-.8.1-1.2.6-.4.4-1.6 1.5-1.6 3.8 0 2.2 1.6 4.3 1.8 4.6.2.3 3.2 4.9 7.8 6.7 1.1.5 1.9.7 2.6.9 1.1.3 2 .3 2.8.2.9-.1 2.4-1 2.7-1.9.3-.9.3-1.7.2-1.9-.1-.2-.4-.3-.8-.5Z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="h-6 w-6">
      <path fill="#fff" d="M5.2 8h21.6v16.3H5.2z" />
      <path fill="#EA4335" d="M5.2 8 16 16.4 26.8 8v3.9L16 20.2 5.2 11.9z" />
      <path fill="#FBBC04" d="M5.2 11.9 16 20.2 5.2 24.3z" />
      <path fill="#34A853" d="M26.8 11.9v12.4L16 20.2z" />
      <path fill="#4285F4" d="M5.2 24.3h21.6L16 20.2z" />
      <path fill="#C5221F" d="M5.2 8h3.1v16.3H5.2z" />
      <path fill="#188038" d="M23.7 8h3.1v16.3h-3.1z" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-dvh overflow-hidden bg-[#fff8ed] text-[#17131f]">
      <section className="relative min-h-dvh">
        <img
          src={`${basePath}/assets/subliexpresate-hero.png`}
          alt="Productos personalizados de Subliexpresate"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,248,237,0.98)_0%,rgba(255,248,237,0.86)_44%,rgba(23,19,31,0.18)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#fff8ed] to-transparent" />

        <div className="pointer-events-none absolute left-4 top-4 h-14 w-14 rotate-6 border-[10px] border-[#22d3ee]/80 sm:left-8 sm:top-8 sm:h-20 sm:w-20" />
        <div className="pointer-events-none absolute bottom-20 right-4 grid grid-cols-3 gap-1.5 sm:right-8 sm:gap-2">
          {["#d946ef", "#22d3ee", "#facc15", "#17131f", "#fb7185", "#ffffff"].map((color) => (
            <span
              key={color}
              className="h-4 w-4 rotate-12 shadow-[0_8px_20px_rgba(23,19,31,0.16)] sm:h-5 sm:w-5"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto flex min-h-dvh max-w-6xl flex-col justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
          <header className="flex items-center justify-between gap-4">
            <img
              src={`${basePath}/assets/logo-subliexpresate-transparent.png`}
              alt="Subliexpresate"
              className="h-14 w-auto max-w-[58vw] object-contain sm:h-16 lg:h-20"
            />
            <div className="hidden border-l-4 border-[#d946ef] bg-white/80 px-3 py-1.5 text-right text-xs font-black uppercase tracking-[0.16em] shadow-[6px_6px_0_#22d3ee] backdrop-blur sm:block">
              Muy pronto
            </div>
          </header>

          <div className="grid gap-6 pb-6 pt-5 lg:grid-cols-[1fr_0.7fr] lg:items-end lg:pb-8">
            <div className="max-w-2xl">
              <p className="inline-flex border-2 border-[#17131f] bg-[#facc15] px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] shadow-[5px_5px_0_#17131f] sm:text-sm">
                P&aacute;gina en construcci&oacute;n
              </p>
              <h1 className="mt-5 max-w-3xl text-[clamp(2.35rem,7vw,4.9rem)] font-black leading-[0.96] tracking-normal text-[#17131f]">
                Estamos preparando algo para que tus ideas salgan a lucirse.
              </h1>
              <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-[#3b3147] sm:text-lg">
                El sitio todav&iacute;a est&aacute; tomando forma, pero Subliexpresate ya est&aacute; lista para escuchar tu pedido, ayudarte a elegir el producto y convertir tu dise&ntilde;o en un regalo &uacute;nico.
              </p>
            </div>

            <aside className="w-full max-w-lg justify-self-end border-2 border-[#17131f] bg-white/88 p-3 shadow-[8px_8px_0_#d946ef] backdrop-blur sm:p-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0891b2] sm:text-sm">Contactanos</p>
              <div className="mt-3 grid gap-2.5">
                {contactLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="group flex items-center justify-between gap-3 border-2 border-[#17131f] bg-[#fff8ed] px-3 py-3 font-black shadow-[4px_4px_0_#17131f] transition hover:-translate-y-1 hover:bg-[#22d3ee] hover:shadow-[6px_6px_0_#17131f] sm:px-4"
                    target={link.href.startsWith("https") ? "_blank" : undefined}
                    rel={link.href.startsWith("https") ? "noreferrer" : undefined}
                  >
                    <span>
                      <span className="block text-xs uppercase tracking-[0.18em] text-[#d946ef] group-hover:text-[#17131f]">
                        {link.label}
                      </span>
                      <span className="mt-1 block break-all text-base text-[#17131f] sm:text-lg">{link.value}</span>
                    </span>
                    <span className="grid h-9 w-9 shrink-0 place-items-center border-2 border-[#17131f] bg-white transition group-hover:translate-x-1 sm:h-10 sm:w-10">
                      <ContactIcon icon={link.icon} />
                    </span>
                  </a>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
