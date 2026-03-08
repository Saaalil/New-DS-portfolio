import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "Salil Hiremath — Data Scientist & ML Engineer",
  description:
    "Portfolio of Salil Hiremath — Data Scientist & Machine Learning Engineer specializing in deep learning, NLP, and large-scale analytics. Currently at Myntra (Flipkart Group). Building ML systems for defense, healthcare, and enterprise domains.",
  keywords: [
    "Data Scientist",
    "Machine Learning Engineer",
    "Salil Hiremath",
    "ML Portfolio",
    "Deep Learning",
    "NLP",
    "AI Engineer",
    "Data Science Portfolio",
    "Myntra",
    "Python",
    "TensorFlow",
  ],
  authors: [{ name: "Salil Hiremath" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://salil-portfolio.vercel.app",
    title: "Salil Hiremath — Data Scientist & ML Engineer",
    description:
      "Building ML systems that drive decision-level insights. Deep learning, NLP, and large-scale analytics across defense, healthcare, and enterprise domains.",
    siteName: "Salil Hiremath Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salil Hiremath — Data Scientist & ML Engineer",
    description:
      "Building ML systems that drive decision-level insights across defense, healthcare, and enterprise domains.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Salil Hiremath",
  url: "https://salil-portfolio.vercel.app",
  jobTitle: "Data Scientist & Machine Learning Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Myntra (Flipkart Group)",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Manipal University Jaipur",
  },
  sameAs: [
    "https://github.com/Saaalil",
    "https://www.linkedin.com/in/salil-hiremath-946784212/",
  ],
  knowsAbout: [
    "Machine Learning",
    "Deep Learning",
    "Natural Language Processing",
    "Data Science",
    "Python",
    "TensorFlow",
    "PyTorch",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>
          {/* Custom cursor & scroll progress */}
          <CursorGlow />
          <ScrollProgress />

          {/* Background effects */}
          <div className="grid-bg" />
          <div className="noise-overlay" />

          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
