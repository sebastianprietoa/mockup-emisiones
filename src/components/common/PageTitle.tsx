type PageTitleProps = {
  eyebrow?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
};

export function PageTitle({ eyebrow, title, description, action }: PageTitleProps) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur sm:p-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl space-y-2">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h1>
        <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">{description}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

