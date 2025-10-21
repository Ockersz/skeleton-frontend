// src/components/landing/Reveal.tsx
import React from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  y?: number; // translateY distance (px)
  threshold?: number;
};

export default function Reveal({
  children,
  className,
  y = 16,
  threshold = 0.15,
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;

    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold },
    );

    io.observe(el);

    return () => io.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={[
        "transition-all duration-700 ease-out will-change-transform will-change-opacity",
        visible
          ? "opacity-100 translate-y-0"
          : `opacity-0 translate-y-[${y}px]`,
        className ?? "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
