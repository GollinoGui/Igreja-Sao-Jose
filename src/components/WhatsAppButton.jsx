const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full bg-green-deep px-5 py-2.5 font-sans text-sm font-medium text-stone-50 transition-colors duration-200 hover:bg-green-mid";

export function WhatsAppButton({ href, children = "Falar no WhatsApp", className = "" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${baseClasses} ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="currentColor"
      >
        <path d="M17.47 14.38c-.29-.15-1.7-.84-1.97-.93-.26-.1-.46-.15-.65.15-.2.29-.75.93-.92 1.12-.17.2-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.71-1.6-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.5.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.65-1.57-.9-2.15-.24-.57-.48-.49-.65-.5h-.56c-.2 0-.51.07-.78.37-.26.29-1.02 1-1.02 2.43 0 1.43 1.05 2.81 1.19 3 .15.2 2.06 3.15 5 4.42.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.7-.7 1.94-1.37.24-.68.24-1.25.17-1.37-.07-.12-.26-.2-.55-.34z" />
        <path d="M12.02 2C6.5 2 2 6.48 2 12c0 1.9.53 3.68 1.44 5.2L2 22l4.94-1.4A9.94 9.94 0 0 0 12.02 22C17.5 22 22 17.52 22 12S17.5 2 12.02 2zm0 18.1c-1.7 0-3.3-.47-4.65-1.29l-.33-.2-3.09.87.83-3.02-.22-.34A8.1 8.1 0 1 1 20.1 12a8.1 8.1 0 0 1-8.08 8.1z" />
      </svg>
      {children}
    </a>
  );
}
