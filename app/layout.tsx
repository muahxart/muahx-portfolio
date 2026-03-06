import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Inter, Montserrat } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-montserrat",
});

const siteName = "Muahx";
const siteUrl = "https://muahx.art"; // cambieremo se necessario
const description =
  "Digital Art portfolio. A curated selection of works across music, cinema and city atmospheres.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  icons: {
  icon: "/icon.png",
  apple: "/apple-icon.png",
  },

  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },

  description,

  robots: {
    index: true,
    follow: true,
  },

openGraph: {
  type: "website",
  url: siteUrl,
  title: siteName,
  description,
  siteName,
  images: [
    {
      url: "/condivisione.jpg",
      width: 1200,
      height: 630,
      alt: "Muahx Digital Art Portfolio",
    },
  ],
  },
twitter: {
  card: "summary_large_image",
  title: siteName,
  description,
  images: ["/condivisione.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable}`}
    >
      <body className="bg-white text-black">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}