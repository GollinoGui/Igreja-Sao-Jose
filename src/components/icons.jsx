/**
 * Conjunto de ícones de linha, desenhados à mão para o site (evita o "kit
 * genérico" de bibliotecas como Lucide/Feather). Traço único, viewBox
 * 0 0 24 24, sem preenchimento — herdam a cor do texto via currentColor.
 */

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Svg({ className, children, label }) {
  return (
    <svg {...base} className={className} aria-hidden={label ? undefined : true} role={label ? "img" : undefined} aria-label={label}>
      {children}
    </svg>
  );
}

export function IconBaptism({ className }) {
  return (
    <Svg className={className}>
      <path d="M12 3c-2.2 2.6-3.5 4.8-3.5 6.8a3.5 3.5 0 0 0 7 0C15.5 7.8 14.2 5.6 12 3Z" />
      <path d="M4.5 15.5c1.2 1 2 2.6 2 4.4M8.5 14c1.4 1.3 2.2 3.3 2.2 5.9M19.5 15.5c-1.2 1-2 2.6-2 4.4M15.5 14c-1.4 1.3-2.2 3.3-2.2 5.9M4 20.3h16" />
    </Svg>
  );
}

export function IconConfirmation({ className }) {
  return (
    <Svg className={className}>
      <path d="M12 2.5c1.4 2.3 3.4 3.4 6 3.6-.2 6.6-2.5 10.9-6 12.9-3.5-2-5.8-6.3-6-12.9 2.6-.2 4.6-1.3 6-3.6Z" />
      <path d="M9.3 11.3 11.3 13l3.6-4" />
    </Svg>
  );
}

export function IconEucharist({ className }) {
  return (
    <Svg className={className}>
      <path d="M7 9h10l-1.2 8.4a2 2 0 0 1-2 1.6h-3.6a2 2 0 0 1-2-1.6L7 9Z" />
      <path d="M6 9h12M12 9V4.5" />
      <circle cx="12" cy="3" r="1.1" />
    </Svg>
  );
}

export function IconConfession({ className }) {
  return (
    <Svg className={className}>
      <path d="M7 21v-6a5 5 0 0 1 10 0v6" />
      <path d="M4.5 21h15" />
      <path d="M9.5 12.2a2.5 2.5 0 0 1 5 0" />
    </Svg>
  );
}

export function IconAnointing({ className }) {
  return (
    <Svg className={className}>
      <path d="M12 3.5c1.9 2.3 3.2 4.5 3.2 6.6a3.2 3.2 0 1 1-6.4 0c0-2.1 1.3-4.3 3.2-6.6Z" />
      <path d="M5 21c1-4 3.4-6.4 7-6.4S18 17 19 21" />
    </Svg>
  );
}

export function IconOrders({ className }) {
  return (
    <Svg className={className}>
      <path d="M8 3.5c1.2 2 1.6 3.7.9 5.4-1.8 1-2.9 2.6-3.4 5-.4 2 .1 4.4 1.6 6.1" />
      <path d="M16 3.5c-1.2 2-1.6 3.7-.9 5.4 1.8 1 2.9 2.6 3.4 5 .4 2-.1 4.4-1.6 6.1" />
      <path d="M9.6 8.4h4.8" />
    </Svg>
  );
}

export function IconMatrimony({ className }) {
  return (
    <Svg className={className}>
      <circle cx="9" cy="13" r="4.3" />
      <circle cx="15" cy="13" r="4.3" />
    </Svg>
  );
}

export function IconTower({ className }) {
  return (
    <Svg className={className}>
      <path d="M12 2.5v3" />
      <path d="M10.3 5.5h3.4l1.3 4.3H9l1.3-4.3Z" />
      <path d="M8.4 9.8h7.2L17 21.5H7L8.4 9.8Z" />
      <path d="M10 14h4M9.4 17.5h5.2" />
    </Svg>
  );
}

export function IconBell({ className }) {
  return (
    <Svg className={className}>
      <path d="M12 3.5c-3 0-4.6 2.6-4.6 6.4 0 4.2-1.2 5.6-2.1 6.4h13.4c-.9-.8-2.1-2.2-2.1-6.4 0-3.8-1.6-6.4-4.6-6.4Z" />
      <path d="M9.6 19.3a2.4 2.4 0 0 0 4.8 0" />
    </Svg>
  );
}

export function IconWater({ className }) {
  return (
    <Svg className={className}>
      <path d="M12 3c-2.7 3.2-5.2 6.7-5.2 9.8a5.2 5.2 0 1 0 10.4 0C17.2 9.7 14.7 6.2 12 3Z" />
    </Svg>
  );
}

export function IconWell({ className }) {
  return (
    <Svg className={className}>
      <ellipse cx="12" cy="8" rx="6.5" ry="2.6" />
      <path d="M5.5 8v6c0 1.5 2.9 2.6 6.5 2.6s6.5-1.1 6.5-2.6V8" />
      <path d="M12 5.4V2M9 3.2l3 2.2 3-2.2" />
    </Svg>
  );
}

export function IconStar({ className }) {
  return (
    <Svg className={className}>
      <path d="M12 3.5 14 9l5.8.4-4.5 3.8 1.5 5.7L12 15.8 6.2 18.9l1.5-5.7-4.5-3.8L9 9 12 3.5Z" />
    </Svg>
  );
}

export function IconGlobe({ className }) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.2 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.2-3.6-8.5S9.6 5.8 12 3.5Z" />
    </Svg>
  );
}

export function IconWheel({ className }) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="1.4" />
      <path d="M12 4v4M12 16v4M4 12h4M16 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8" />
    </Svg>
  );
}

export function IconScroll({ className }) {
  return (
    <Svg className={className}>
      <path d="M6.5 4.5h9a2 2 0 0 1 2 2V19a1.5 1.5 0 0 1-2.4 1.2L14 19l-1.6 1.2a1.6 1.6 0 0 1-2 0L8.8 19l-1.4 1.2A1.5 1.5 0 0 1 5 19V7a2 2 0 0 1 1.5-1.9Z" />
      <path d="M9 9.5h6M9 12.8h6" />
    </Svg>
  );
}

export function IconMapPin({ className }) {
  return (
    <Svg className={className}>
      <path d="M12 21s-6.5-6.1-6.5-11A6.5 6.5 0 0 1 18.5 10c0 4.9-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </Svg>
  );
}

export function IconPhone({ className }) {
  return (
    <Svg className={className}>
      <path d="M6.5 4.5h2.8l1.3 3.6-2 1.6a12 12 0 0 0 5.7 5.7l1.6-2 3.6 1.3v2.8a1.5 1.5 0 0 1-1.6 1.5A15.5 15.5 0 0 1 5 5.1a1.5 1.5 0 0 1 1.5-1.6Z" />
    </Svg>
  );
}

export function IconMail({ className }) {
  return (
    <Svg className={className}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M4.5 7 12 12.5 19.5 7" />
    </Svg>
  );
}

export function IconClock({ className }) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Svg>
  );
}

export function IconCalendar({ className }) {
  return (
    <Svg className={className}>
      <rect x="4" y="5.5" width="16" height="14.5" rx="2" />
      <path d="M4 10h16M8 3.5v3M16 3.5v3" />
    </Svg>
  );
}

export function IconTrinity({ className }) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="8" r="4" />
      <circle cx="8" cy="15" r="4" />
      <circle cx="16" cy="15" r="4" />
    </Svg>
  );
}

/** Ícone por sacramento (chaves de SACRAMENTS em src/lib/content.js). */
export const SACRAMENT_ICONS = {
  batismo: IconBaptism,
  crisma: IconConfirmation,
  eucaristia: IconEucharist,
  confissao: IconConfession,
  uncao: IconAnointing,
  ordem: IconOrders,
  matrimonio: IconMatrimony,
};
