import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { business } from "@/content/business";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ChatbotLoader } from "@/components/chatbot/ChatbotLoader";
import { MobilePerformanceBoot } from "@/components/site/MobilePerformanceBoot";

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
  alternates: {
    canonical: "/",
  },
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
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

const GTM_ID = "GTM-K65PH3X6";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Google Tag Manager */}
        <script
          id="gtm-init"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} site-bg min-h-full antialiased text-white`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <MobilePerformanceBoot />
        <Script
          id="ld-local-business"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        <Script
          id="google-ads-gtag-src"
          src="https://www.googletagmanager.com/gtag/js?id=AW-11503729585"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-11503729585');
          `}
        </Script>
        <Script
          id="callrail-swap"
          src="https://cdn.callrail.com/companies/169324025/866632495c6e3490162a/12/swap.js"
          strategy="afterInteractive"
        />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <ChatbotLoader />
      </body>
    </html>
  );
}
