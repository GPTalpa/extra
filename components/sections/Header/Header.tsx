import "./Header.scss";

import Image from "next/image";
import Link from "next/link";

import Profile from "@ui/Profile";
import Input from "@ui/Input";
import getUser from "@utils/getUser";

const Header = async () => {
  const data = await getUser();

  return (
    <header className="site-header">
      <Link href="/">
        {" "}
        <Image src="/icon/logo.svg" alt="Логотип" width={116} height={72} />
      </Link>

      <nav>
        <ul>
          <li>
            <Link href="/selecting_device">Подбор прибора</Link>
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
      <Profile user={data?.user ? data.user : null} />
    </header>
  );
};

export default Header;
