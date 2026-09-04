const TONES = {
  light: { value: "text-ink", label: "text-ink/55", icon: "text-terracotta" },
  dark: { value: "text-stone-50", label: "text-stone-50/60", icon: "text-gold-bright" },
};

export function StatCard({ value, label, icon: Icon, tone = "light", className = "" }) {
  const t = TONES[tone];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {Icon && <Icon className={`h-6 w-6 shrink-0 ${t.icon}`} />}
      <div>
        <p className={`font-serif text-2xl font-semibold leading-none md:text-3xl ${t.value}`}>{value}</p>
        <p className={`mt-1.5 text-xs uppercase tracking-wide ${t.label}`}>{label}</p>
      </div>
    </div>
  );
}
