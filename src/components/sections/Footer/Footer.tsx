"use client";

import "./Footer.scss";

import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <footer className="site-footer">
      <address>
        <Link href="tel:+71234567890">+7 (123) 456 78 90</Link>
        <Link href="mailto:extravoda@gmail.com">extravoda@gmail.com</Link>
      </address>
      <Image src="/icon/logo.svg" alt="Логотип" width={116} height={72} />
      <div className="footer-policy">
        <Link href="#">Политика</Link>
        <p>© 2026 All rights reserved</p>
      </div>
    </footer>
  );
};

export default Header;
