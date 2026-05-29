import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Subliexpresate",
  description: "Productos personalizados por sublimación para regalos, fechas especiales y emprendimientos."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
