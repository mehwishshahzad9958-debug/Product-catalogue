"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

type NavLink = { label: string; href: string };

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

/**
 * Navigation links plus the mobile menu.
 * This is the only interactive part of the header, so it is the only part
 * marked "use client"; the rest of the header stays a Server Component.
 */
export default function HeaderNav({ links }: { links: readonly NavLink[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  // Close the mobile menu whenever the page changes, however the visitor navigated.
  // (Adjusting state during render is React's recommended pattern for this.)
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Close the mobile menu with the Escape key.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = (href: string) =>
    isActive(pathname, href)
      ? "text-green underline decoration-turmeric decoration-2 underline-offset-8"
      : "text-earth hover:text-green";

  return (
    <>
      {/* Desktop */}
      <ul className="hidden items-center gap-8 md:flex">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
              className={`text-base font-medium transition-colors ${linkClass(link.href)}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile toggle */}
      <button
        type="button"
        className="inline-flex h-11 items-center gap-2 rounded-md border border-earth/20 px-3 text-sm font-medium text-earth md:hidden"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true" className="flex w-4 flex-col gap-[3px]">
          <span className="h-0.5 w-full bg-current" />
          <span className="h-0.5 w-full bg-current" />
          <span className="h-0.5 w-full bg-current" />
        </span>
        {open ? "Close" : "Menu"}
      </button>

      {/* Mobile panel */}
      <div
        id={menuId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-earth/10 bg-ivory shadow-sm md:hidden"
      >
        <ul className="mx-auto flex max-w-7xl flex-col px-6 py-2">
          {links.map((link) => (
            <li key={link.href} className="border-b border-earth/10 last:border-b-0">
              <Link
                href={link.href}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`block py-4 text-base font-medium ${linkClass(link.href)}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
