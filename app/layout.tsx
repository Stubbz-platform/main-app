import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import ThemeProviders from "@/components/ThemeProvider/Provider";
import AuthProviders from "@/components/AuthProviders/AuthProviders";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Toaster } from "@/components/ui/toaster";
import WalletsProviders from "@/components/AuthProviders/WalletsProviders";
const inter = Inter({ subsets: ["latin"] });
const roobert = localFont({ src: "../fonts/Roobert-Regular.ttf" });

export const metadata: Metadata = {
  title: {
    default: "Stubbz",
    template: "%s | Stubbz",
  },
  description: "The Event Management platform from the future!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roobert.className}>
        <AuthProviders>
          <WalletsProviders>
            <ThemeProviders>
              <Header />
              <main className="min-h-screen overflow-hidden relative">
                <div className="container flex flex-col justify-center ">
                  {children}
                </div>
              </main>
              <Footer />
              <Toaster />
            </ThemeProviders>
          </WalletsProviders>
        </AuthProviders>
      </body>
    </html>
  );
}
