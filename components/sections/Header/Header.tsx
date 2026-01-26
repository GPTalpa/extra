import "./Header.scss";

import Image from "next/image";
import Link from "next/link";

import Profile from "@ui/Profile";
import Input from "@ui/Input";

const Header = () => {
  return (
    <header className="site-header">
      <Image src="/icon/logo.svg" alt="Логотип" width={116} height={72} />
      <nav>
        <ul>
          <li>
            <Link href={"#"}>Подбор прибора</Link>
          </li>
          <li>
            <Link href={"#"}>Справка</Link>
          </li>
          <li>
            <Link href={"#"}>Обучение</Link>
          </li>
        </ul>
      </nav>
      <Input placeholder="Глобальный поиск..." />
      <Profile />
    </header>
  );
};

export default Header;
