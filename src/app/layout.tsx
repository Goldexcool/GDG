import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthHeader from "@/components/auth/AuthHeader";
import PageLoader from "@/components/PageLoader";
import { Toaster } from 'react-hot-toast';
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "WellBalance - Digital Wellness Platform",
  description: "Track your wellness journey with our comprehensive digital platform featuring custom authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins antialiased`}>
        <PageLoader />
        <AuthProvider>
          <AuthHeader />
          {children}
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
