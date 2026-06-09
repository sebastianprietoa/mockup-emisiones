type ChartCardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function ChartCard({ title, description, children, footer }: ChartCardProps) {
  return (
    <section className="rounded-[28px] border border-[#D7CCC1] bg-[#FFF9F1] p-5 shadow-soft backdrop-blur">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-[#362F32]">{title}</h3>
          {description ? <p className="mt-1 text-sm text-[#5B6165]">{description}</p> : null}
        </div>
      </div>
      <div className="h-[320px]">{children}</div>
      {footer ? <div className="mt-4">{footer}</div> : null}
    </section>
  );
}
