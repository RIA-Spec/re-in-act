import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { DevInspector } from "@mcpc-tech/unplugin-dev-inspector-mcp/next";
import "./globals.css";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts: IBM Plex Sans + JetBrains Mono */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* Inline script to prevent FOUC — sets class before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(t==='dark')d.classList.add('dark');else if(t==='light')d.classList.add('light');else{d.classList.add(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')}}catch(e){d.classList.add('dark')}})()`,
          }}
        />
      </head>
      <body className="antialiased font-sans transition-colors duration-200">
        <DevInspector />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
