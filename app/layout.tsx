import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "High Horse — Search Marketing Agency",
  description:
    "Turn search intent into revenue. We capture demand across paid, organic, and AI search and connect it to qualified leads, sales, and measurable revenue.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${poppins.variable} antialiased`}
    >
      <body>
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WXLND8KV');`}
        </Script>
        <Header />
        {children}
        <Footer />
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WXLND8KV" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
        </noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}

      </body>
    </html>
  );
}
