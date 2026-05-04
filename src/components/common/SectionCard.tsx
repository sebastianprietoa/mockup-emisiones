type SectionCardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function SectionCard({ title, description, children, className = "" }: SectionCardProps) {
  return (
    <section className={`rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-soft backdrop-blur ${className}`}>
      <div className="mb-4 space-y-1">
        <h2 className="text-base font-semibold text-white">{title}</h2>
        {description ? <p className="text-sm text-slate-400">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

