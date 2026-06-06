type SectionCardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function SectionCard({ title, description, children, className = "" }: SectionCardProps) {
  return (
    <section className={`rounded-[28px] border border-[#D7CCC1] bg-[#FFF9F1] p-5 shadow-soft backdrop-blur ${className}`}>
      <div className="mb-4 space-y-1">
        <h2 className="text-base font-semibold text-[#362F32]">{title}</h2>
        {description ? <p className="text-sm text-[#5B6165]">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
