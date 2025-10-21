// src/layouts/default.tsx
import React from "react";
import { Link } from "@heroui/link";

import { Navbar } from "@/components/navbar";

type DefaultLayoutProps = {
  children: React.ReactNode;
  companyName?: string;
  companyLogoUrl?: string;
};

export default function DefaultLayout({
  children,
  companyName = "Your Company",
  companyLogoUrl,
}: DefaultLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Skip to content (a11y) */}
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:top-4 focus:left-4 focus:px-3 focus:py-2 focus:rounded-md focus:bg-default-100 focus:text-foreground"
        href="#main"
      >
        Skip to content
      </a>

      {/* Top bar */}
      <Navbar
        companyLogoUrl={companyLogoUrl}
        companyName={companyName}
        hideSearch={true}
        hideSocial={true}
        hideSponsor={true}
      />

      {/* Content */}
      <main
        className="flex-1 pt-16 md:pt-20"
        id="main"
        role="main"

        // pt matches sticky navbar height (approx 64px/80px)
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-default-100">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between text-sm text-default-600">
          <span>
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
