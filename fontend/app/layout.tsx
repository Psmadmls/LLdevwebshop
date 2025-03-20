import Navbar from "@/components/Navbar";
import Link from "next/link";
import Providers from "@/components/providers";
import "./globals.css";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Roitai NextJS",
  description: "NextJS 15 Tutorial",
  keywords: "Roitai, Camping, Thailand, NextJS",
};
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
      <Providers>
        <Navbar />
        {children}
        </Providers>
      </body>
    </html>
  );
};
export default layout;