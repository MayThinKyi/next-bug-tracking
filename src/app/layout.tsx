import { Toaster } from 'react-hot-toast';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import "easymde/dist/easymde.min.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AppSessionProvider from "@/contexts/AppSessionProvider";
import 'react-loading-skeleton/dist/skeleton.css'
import QueryProvider from "@/contexts/QueryProvider";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter', });

export const metadata: Metadata = {
  title: "Next 14 Issue Tracker App",
  description: "Built using Next.14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Toaster />
        <QueryProvider>
          <AppSessionProvider>
            <Theme>
              <Navbar />
              <main className="py-8 px-8">
                {children}
              </main>
            </Theme>
          </AppSessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
