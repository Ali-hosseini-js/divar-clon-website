import { vazir } from "@/utils/fonts";
import "./globals.css";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import NextAuthProvider from "@/providers/NextAuthProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

export const metadata = {
  title: "سایت دیوار",
  description: "سایت خرید و فروش لوازم دست دوم",
  icons: { icon: "divar.svg" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazir.className}>
        <NextAuthProvider>
          <ReactQueryProvider>
            <Header />
            {children}
            <Footer />
          </ReactQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
