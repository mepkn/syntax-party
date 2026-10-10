export function Logo() {
  return (
    <a href="/" className="flex items-center gap-2 font-semibold tracking-tight">
      <span aria-hidden className="grid size-7 place-items-center rounded-md bg-primary font-mono text-xs text-primary-foreground">
        {"</>"}
      </span>
      syntax-party
    </a>
  );
}
