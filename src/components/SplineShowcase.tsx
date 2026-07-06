import { lazy, Suspense, useState } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

export type SplineModel = {
  title: string;
  desc: string;
  scene: string;
  tags?: string[];
};

export function SplineShowcase({ models }: { models: SplineModel[] }) {
  return (
    <div className="flex flex-col gap-6">
      {models.map((m) => (
        <SplineCard key={m.scene} model={m} />
      ))}
    </div>
  );
}

function SplineCard({ model }: { model: SplineModel }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <article className="reveal group relative rounded-xl border border-border bg-surface/60 backdrop-blur overflow-hidden hover:border-primary transition-colors">
      <div className="relative aspect-square w-full bg-background/60">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        )}
        <Suspense fallback={null}>
          <Spline scene={model.scene} onLoad={() => setLoaded(true)} />
        </Suspense>
      </div>
      <div className="p-5 border-t border-border">
        <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
          {model.title}
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{model.desc}</p>
        {model.tags && model.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {model.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] font-mono rounded-md bg-accent/10 text-accent px-2 py-1 border border-accent/20"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}