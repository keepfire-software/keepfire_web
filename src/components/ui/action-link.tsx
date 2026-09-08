import type { AnchorHTMLAttributes, ReactNode } from "react";
import styles from "./action-link.module.css";

type ActionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "outline";
};

export function ActionLink({
  children,
  className = "",
  variant = "primary",
  ...props
}: ActionLinkProps) {
  return (
    <a
      className={`${styles.action} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
