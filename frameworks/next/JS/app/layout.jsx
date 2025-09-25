import Script from "next/script";

export const metadata = {
  title: "Nutrient Web SDK - Next.js Examples",
  description:
    "Explore different ways to integrate Nutrient Web SDK with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Nutrient Web SDK CDN */}
        <Script
          src="https://cdn.cloud.pspdfkit.com/pspdfkit-web@1.7.0/nutrient-viewer.js"
          strategy="beforeInteractive"
        />
      </head>
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
