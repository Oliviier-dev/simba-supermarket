import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Simba Supermarket — Rwanda's Finest, Delivered",
  description:
    "Shop 552+ products across 9 categories. Fresh groceries, cosmetics, beverages, household essentials — delivered to your door in Kigali.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={geist.variable}
    >
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </ThemeProvider>
      </body>
    </html>
  );
}
