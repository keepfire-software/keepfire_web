import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer-inner">
        <span>&copy; {new Date().getFullYear()} {siteConfig.name}</span>
        <span>
          Missed-call recovery and follow-up for small HVAC companies.
        </span>
      </div>
    </footer>
  );
}
