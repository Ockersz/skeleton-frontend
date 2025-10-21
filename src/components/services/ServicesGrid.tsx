// src/components/services/ServicesGrid.tsx
import { ServiceCard, ServiceCardProps } from "./ServiceCard";

type ServicesGridProps = { items: ServiceCardProps[] };

export function ServicesGrid({ items }: ServicesGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((item, idx) => (
        <ServiceCard key={idx} {...item} />
      ))}
    </div>
  );
}
