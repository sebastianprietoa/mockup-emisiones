import logoUrl from "../../assets/brand/gt-logo.png";

type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className = "h-12 w-auto" }: BrandLogoProps) {
  return (
    <img
      src={logoUrl}
      alt="Green Ticket"
      className={`${className} rounded-2xl border border-white/10 bg-white/5 object-contain shadow-soft`}
    />
  );
}
