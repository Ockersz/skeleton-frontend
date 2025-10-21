// src/pages/index.tsx
import type { ServiceCardProps } from "@/components/services/ServiceCard";

import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { Button } from "@heroui/button";

import DefaultLayout from "@/layouts/default";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import CarouselHero from "@/components/landing/CarouselHero";
import Reveal from "@/components/landing/Reveal";
import { siteConfig } from "@/config/site";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
    {children}
  </h2>
);

/** Full-height, snap-start section with consistent spacing & anchor offset */
function Section({
  id,
  children,
  center = false,
}: {
  id: string;
  children: React.ReactNode;
  /** center content vertically (hero), otherwise normal flow */
  center?: boolean;
}) {
  return (
    <section
      className={[
        // snap and viewport height minus sticky navbar (64px mobile, 80px md+)
        "snap-start",
        "min-h-[calc(100svh-4rem)] md:min-h-[calc(100svh-5rem)]",
        // anchor offset so hashes don't hide under navbar
        "scroll-mt-16 md:scroll-mt-20",
        // vertical spacing inside each section
        "py-10 sm:py-12 md:py-16",
        // optional vertical centering (for hero)
        center ? "flex items-center" : "",
        // respect iOS safe area a little
        "pb-[calc(2.5rem+env(safe-area-inset-bottom,0))]",
      ].join(" ")}
      id={id}
    >
      <div className="w-full mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

export default function IndexPage() {
  // dummy company slides (replace imageUrl with /public images as needed)
  const slides = [
    {
      title: "NovaGrid Systems",
      subtitle:
        "We craft production-ready React frontends with HeroUI + Redux Toolkit—fast, secure, and scalable.",
      cta: { label: "Get Started", href: "/docs" },
      imageUrl: null,
    },
    {
      title: "Authentication & RBAC",
      subtitle:
        "Modern auth flows, refresh tokens, and role-based routing out of the box.",
      cta: { label: "See Auth Docs", href: "/docs#auth" },
      imageUrl: null,
    },
    {
      title: "Dynamic Forms",
      subtitle:
        "Schema-driven forms with validation, field-level permissions, and easy customization.",
      cta: { label: "Form Guide", href: "/docs#forms" },
      imageUrl: null,
    },
  ];

  const services: ServiceCardProps[] = [
    {
      imageUrl: "/images/auth.jpg",
      imageAlt: "Authentication",
      icon: <span className="text-2xl">🔐</span>,
      title: "Authentication & Roles",
      subtitle: "Login, Register, RBAC, Protected Routes",
      description:
        "JWT/refresh token flows, Redux Toolkit slices, and role-based guards for secure navigation.",
      primaryAction: { label: "Read docs", href: "/docs#auth" },
      secondaryAction: { label: "Admin console", href: "/admin" },
    },
    {
      imageUrl: "/images/forms.jpg",
      imageAlt: "Dynamic Forms",
      icon: <span className="text-2xl">🧾</span>,
      title: "Dynamic Forms",
      subtitle: "Builder, Validation & Access Control",
      description:
        "Schema-driven forms with granular field permissions, validation, and per-role visibility.",
      primaryAction: { label: "Form guide", href: "/docs#forms" },
      secondaryAction: { label: "Examples", href: "/docs#form-examples" },
    },
    {
      imageUrl: "/images/admin.jpg",
      imageAlt: "Admin Console",
      icon: <span className="text-2xl">⚙️</span>,
      title: "Admin Console",
      subtitle: "Users, Roles, Teams & Audits",
      description:
        "Manage users, teams, role assignments, and audit logs using clean HeroUI components.",
      primaryAction: { label: "Admin docs", href: "/docs#admin" },
      secondaryAction: { label: "About us", href: "/about", asButton: true },
    },
  ];

  return (
    <DefaultLayout companyName="NovaGrid Systems">
      {/* snap container */}
      <div className="snap-y snap-mandatory scroll-smooth">
        {/* Section 1: Welcome / Carousel */}
        <Section center id="welcome">
          <Reveal className="w-full">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Welcome to{" "}
                <span className="text-primary">NovaGrid Systems</span>
              </h1>
              <p className="mt-3 text-default-600 max-w-2xl mx-auto">
                Build beautiful, robust apps fast—HeroUI components, Redux
                patterns, and production-ready scaffolding to ship with
                confidence.
              </p>
            </div>

            <CarouselHero slides={slides} />

            <div className="mt-8 flex items-center justify-center gap-3">
              <Link
                className={buttonStyles({
                  color: "primary",
                  radius: "full",
                  variant: "shadow",
                })}
                href="#services"
              >
                Explore Services
              </Link>
              <Link
                isExternal
                className={buttonStyles({
                  variant: "bordered",
                  radius: "full",
                })}
                href={siteConfig.links.github}
              >
                View GitHub
              </Link>
            </div>
          </Reveal>
        </Section>

        {/* Section 2: Our Services */}
        <Section id="services">
          <Reveal>
            <div className="flex items-end justify-between gap-4 mb-8">
              <SectionTitle>Our Services</SectionTitle>
              <Link className="text-primary text-sm md:text-base" href="#about">
                Learn about us →
              </Link>
            </div>
            <ServicesGrid items={services} />
          </Reveal>
        </Section>

        {/* Section 3: About Us */}
        <Section id="about">
          <Reveal>
            <SectionTitle>About NovaGrid</SectionTitle>
            <p className="mt-4 text-base md:text-lg text-default-600 max-w-3xl">
              At NovaGrid Systems, we specialize in scalable frontends with
              clean state management and excellent UX. Our skeleton provides
              authentication, role-based access, and modular forms so teams can
              focus on features—not boilerplate.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button as={Link} color="primary" href="/docs" variant="shadow">
                Get Started
              </Button>
              <Button
                isExternal
                as={Link}
                href={siteConfig.links.github}
                variant="bordered"
              >
                GitHub
              </Button>
              <Link
                className="text-sm text-default-600 underline underline-offset-4"
                href="/contact"
              >
                Contact us
              </Link>
            </div>
          </Reveal>
        </Section>
      </div>
    </DefaultLayout>
  );
}
