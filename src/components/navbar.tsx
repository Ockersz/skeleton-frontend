// src/components/navbar.tsx
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import React from "react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo as DefaultLogo,
} from "@/components/icons";

type NavbarProps = {
  /** Name shown next to the logo */
  companyName?: string;
  /** If provided, shows this image instead of the default logo */
  companyLogoUrl?: string;
  /** If provided, overrides both default logo and image with a custom React node */
  logoSlot?: React.ReactNode;
  /** Hide social icons (Twitter/Discord/GitHub) */
  hideSocial?: boolean;
  /** Hide the Sponsor button */
  hideSponsor?: boolean;
  /** Hide the search input on large screens */
  hideSearch?: boolean;
};

export const Navbar: React.FC<NavbarProps> = ({
  companyName = "Your Company",
  companyLogoUrl,
  logoSlot,
  hideSocial = false,
  hideSponsor = false,
  hideSearch = false,
}) => {
  const LogoMark = () => {
    if (logoSlot) return <>{logoSlot}</>;
    if (companyLogoUrl) {
      return (
        <img
          alt={`${companyName} logo`}
          className="h-6 w-6 rounded-md object-contain"
          src={companyLogoUrl}
        />
      );
    }

    return <DefaultLogo />;
  };

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["ctrl"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar
      className="border-b border-default-100"
      maxWidth="xl"
      position="sticky"
    >
      {/* Brand + Desktop nav */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            aria-label={`${companyName} home`}
            className="flex justify-start items-center gap-2"
            color="foreground"
            href="/"
          >
            <LogoMark />
            <p className="font-semibold tracking-tight">{companyName}</p>
          </Link>
        </NavbarBrand>

        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      {/* Right section (desktop) */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          {!hideSocial && (
            <>
              <Link
                isExternal
                aria-label="Twitter"
                href={siteConfig.links.twitter}
                title="Twitter"
              >
                <TwitterIcon className="text-default-500" />
              </Link>
              <Link
                isExternal
                aria-label="Discord"
                href={siteConfig.links.discord}
                title="Discord"
              >
                <DiscordIcon className="text-default-500" />
              </Link>
              <Link
                isExternal
                aria-label="GitHub"
                href={siteConfig.links.github}
                title="GitHub"
              >
                <GithubIcon className="text-default-500" />
              </Link>
            </>
          )}
          <ThemeSwitch />
        </NavbarItem>

        {!hideSearch && (
          <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        )}

        {!hideSponsor && (
          <NavbarItem className="hidden md:flex">
            <Button
              isExternal
              as={Link}
              className="text-sm font-normal text-default-600 bg-default-100"
              href={siteConfig.links.sponsor}
              startContent={<HeartFilledIcon className="text-danger" />}
              variant="flat"
            >
              Sponsor
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      {/* Right (mobile) */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {!hideSocial && (
          <>
            <Link isExternal aria-label="GitHub" href={siteConfig.links.github}>
              <GithubIcon className="text-default-500" />
            </Link>
          </>
        )}
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarMenu>
        {!hideSearch && searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={item.href ?? "#"}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
