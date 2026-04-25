import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "@/components/ui/toaster";
import LayoutClient from "@/components/layout-client"; // new name
import SessionProviderWrapper from "@/contexts/SessionProviderWrapper";
import Providers from "./providers";
import RouteChangeHandler from "@/components/RouteChangeHandler";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Edu Portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        
        <SessionProviderWrapper>
          <Providers>
            <AuthProvider>
               {/*context api server fetching + save in client state in the context api -----<CourseProviderWrapper></CourseProviderWrapper>*/}
                 <RouteChangeHandler />
                <LayoutClient>{children}</LayoutClient>

              
            </AuthProvider>
          </Providers>
        </SessionProviderWrapper>

      </body>
    </html>
  );
}
