import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";

export type ServiceCardProps = {
  /** Optional image banner at the top */
  imageUrl?: string | null;
  imageAlt?: string;
  /** Leading visual: emoji or custom React node (shows next to title) */
  icon?: React.ReactNode;
  /** Main title */
  title: string;
  /** Small subtitle under title */
  subtitle?: string;
  /** Short description */
  description: React.ReactNode;
  /** Primary action button (optional) */
  primaryAction?: { label: string; href: string; external?: boolean };
  /** Secondary action link/button (optional) */
  secondaryAction?: {
    label: string;
    href: string;
    external?: boolean;
    asButton?: boolean;
  };
  /** Optional className for extra styling */
  className?: string;
};

export function ServiceCard({
  imageUrl,
  imageAlt = "",
  icon = <span className="text-xl">🧩</span>,
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  className,
}: ServiceCardProps) {
  return (
    <Card
      className={[
        // bigger card footprint
        "h-full overflow-hidden group",
        "transition-transform duration-300 hover:-translate-y-0.5",
        className ?? "",
      ].join(" ")}
      shadow="sm"
    >
      {/* Image banner (optional) */}
      {imageUrl && (
        <div className="relative h-40 sm:h-48 md:h-56 w-full overflow-hidden">
          <img
            alt={imageAlt || title}
            className="absolute inset-0 h-full w-full object-cover"
            src={imageUrl}
          />
          {/* subtle gradient for text legibility when we overlay header */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </div>
      )}

      {/* Header */}
      <CardHeader
        className={[
          "flex items-center gap-4",
          // more generous padding + bigger text
          "px-6 pt-5",
          imageUrl ? "pb-3" : "pb-4",
        ].join(" ")}
      >
        <div className="h-12 w-12 rounded-xl bg-default-100 grid place-items-center text-default-700 shadow-sm">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-semibold leading-tight">
            {title}
          </h3>
          {subtitle ? (
            <p className="text-xs md:text-sm text-default-500">{subtitle}</p>
          ) : null}
        </div>
      </CardHeader>

      {/* Body */}
      <CardBody className="px-6 pb-4 pt-0 text-default-600">
        <div className="text-sm md:text-base leading-relaxed">
          {description}
        </div>
      </CardBody>

      {/* Footer / Actions */}
      {(primaryAction || secondaryAction) && (
        <CardFooter className="px-6 pb-6 pt-0 flex items-center gap-3">
          {primaryAction && (
            <Button
              as={Link}
              className="group-hover:shadow-md transition-shadow"
              color="primary"
              href={primaryAction.href}
              isExternal={primaryAction.external}
              radius="full"
              size="sm"
              variant="shadow"
            >
              {primaryAction.label}
            </Button>
          )}

          {secondaryAction &&
            (secondaryAction.asButton ? (
              <Button
                as={Link}
                href={secondaryAction.href}
                isExternal={secondaryAction.external}
                radius="full"
                size="sm"
                variant="bordered"
              >
                {secondaryAction.label}
              </Button>
            ) : (
              <Link
                className="text-primary text-sm md:text-base hover:underline underline-offset-4"
                href={secondaryAction.href}
                isExternal={secondaryAction.external}
              >
                {secondaryAction.label} →
              </Link>
            ))}
        </CardFooter>
      )}
    </Card>
  );
}
