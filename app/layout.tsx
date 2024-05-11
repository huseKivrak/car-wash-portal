import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Sidenav } from "@/components/layout/Sidenav";
import { cn } from "@/lib/utils";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "CSR Portal",
  description: "AMP Portal for Customer Service Representatives",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background text-foreground antialiased ",
          poppins.className,
        )}
      >
        <Sidenav />
        <main className="flex min-h-screen max-w-7xl flex-col px-8 pt-16 sm:ml-[200px] md:ml-[300px]">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
