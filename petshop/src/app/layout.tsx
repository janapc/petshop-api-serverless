import "./globals.css";
import type { Metadata } from "next";
import { inter } from "./fonts";

export const metadata: Metadata = {
  title: "Petshop",
  description: "manager petshop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
