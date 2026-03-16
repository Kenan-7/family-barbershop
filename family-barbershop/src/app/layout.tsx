import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { business } from "@/content/business";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: `${business.name} | ${business.neighborhoodOrArea}`,
    template: `%s | ${business.name}`,
  },
  description:
    "A clean, family-friendly barbershop for men, kids, and families. View services, prices, hours, and book an appointment.",
  applicationName: business.name,
  keywords: [
    "barbershop",
    "barber",
    "haircut",
    "skin fade",
    "beard trim",
    "kids haircut",
    business.neighborhoodOrArea,
  ],
  openGraph: {
    title: `${business.name} | ${business.neighborhoodOrArea}`,
    description:
      "Professional, welcoming barbershop with clean cuts, fades, and family-friendly service.",
    type: "website",
    images: [{ url: "/logo.png" }],
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    shortcut: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    name: business.name,
    telephone: business.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.addressLine1,
      addressLocality: business.addressLine2,
    },
    url: business.siteUrl,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} site-bg min-h-full antialiased text-white`}
      >
        <Script
          id="ld-local-business"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
