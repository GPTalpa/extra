import "./Header.scss";

import Image from "next/image";
import Link from "next/link";

import Profile from "@ui/Profile";

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
      <div className="search__bar">
        <i
          style={{
            position: "absolute",
            top: "50%",
            left: "30px",
            transform: "translateY(-50%)",
          }}
        >
          <Image src="/icon/search.svg" alt="" width={21} height={21} />
        </i>
        <input type="text" placeholder="Глобальный поиск..." />
        <button className="btn btn-primaty--active">
          <Image src="/icon/search_black.svg" alt="" width={21} height={21} />
        </button>
      </div>

      <Profile />
    </header>
  );
};

export default Header;
