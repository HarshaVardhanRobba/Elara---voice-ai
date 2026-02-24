import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elara",
  description: "AI meeting assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <NuqsAdapter>
          <TRPCReactProvider>
            <Toaster richColors position="top-right" />
            {children}
          </TRPCReactProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}