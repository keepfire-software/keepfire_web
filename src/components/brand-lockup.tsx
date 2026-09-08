import Image from "next/image";
import Link from "next/link";
import keepfireLogo from "../../public/keepfire_logo.png";

export function BrandLockup() {
  return (
    <Link
      href="/"
      className="brand-lockup"
      aria-label="Keepfire home"
    >
      <Image
        src={keepfireLogo}
        alt=""
        priority
      />
      <span>KEEPFIRE</span>
    </Link>
  );
}
