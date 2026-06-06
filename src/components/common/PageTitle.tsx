type PageTitleProps = {
  eyebrow?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
};

export function PageTitle({ eyebrow, title, description, action }: PageTitleProps) {
  return (
    <div className="flex flex-col gap-4 rounded-[28px] border border-[#D7CCC1] bg-[#FFF9F1] p-6 shadow-soft backdrop-blur sm:p-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl space-y-2">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0BA4DE]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-2xl font-semibold text-[#362F32] sm:text-3xl">{title}</h1>
        <p className="max-w-2xl text-sm leading-6 text-[#5B6165] sm:text-base">{description}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
