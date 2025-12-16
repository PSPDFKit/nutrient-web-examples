import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Nutrient Web SDK - Next.js Example",
  description: "PDF viewer powered by Nutrient Web SDK",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://cdn.cloud.pspdfkit.com/pspdfkit-web@1.10.0/nutrient-viewer.js"
          strategy="beforeInteractive"
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
