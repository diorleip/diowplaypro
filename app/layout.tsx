import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import Footer from "./components/Footer";

import "./globals.css";

export const metadata: Metadata = {
  title: "gerador.diowplay",
  description: "Plataforma Premium",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Toaster position="top-right" />

        <div
          style={{
            width: "100%",
            minHeight: "100vh",
            zoom: "0.90",
          }}
        >
          {children}

          <Footer />
        </div>
      </body>
    </html>
  );
}