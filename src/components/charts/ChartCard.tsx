type ChartCardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function ChartCard({ title, description, children, footer }: ChartCardProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-soft backdrop-blur">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-white">{title}</h3>
          {description ? <p className="mt-1 text-sm text-slate-400">{description}</p> : null}
        </div>
      </div>
      <div className="h-[320px]">{children}</div>
      {footer ? <div className="mt-4">{footer}</div> : null}
    </section>
  );
}

