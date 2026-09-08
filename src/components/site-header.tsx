import Link from "next/link";
import { fitCallLinkProps } from "@/config/site";
import { BrandLockup } from "./brand-lockup";
import { ActionLink } from "./ui/action-link";

type NavItem = {
  href: string;
  label: string;
};

type SiteHeaderProps = {
  divider?: "none" | "inner";
  navItems?: readonly NavItem[];
};

export function SiteHeader({
  divider = "none",
  navItems = [],
}: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div
        className={`site-container site-header-inner ${divider === "inner" ? "border-b border-border" : ""}`}
      >
        <BrandLockup />

        {navItems.length > 0 ? (
          <nav aria-label="Primary navigation" className="site-nav">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}

        <ActionLink
          {...fitCallLinkProps}
          variant="outline"
          className="site-header-action"
          aria-label="Book a fit call"
        >
          Book a fit call
        </ActionLink>
      </div>
    </header>
  );
}
