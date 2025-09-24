import Script from "next/script";
import type { ReactNode } from "react";

export const metadata = {
  title: "Nutrient Web SDK - Next.js TypeScript Examples",
  description:
    "Explore different ways to integrate Nutrient Web SDK with Next.js and TypeScript",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* Nutrient Web SDK CDN */}
        <Script
          src="https://cdn.nutrient.io/1.6.0/nutrient-viewer.js"
          strategy="beforeInteractive"
        />
      </head>
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
