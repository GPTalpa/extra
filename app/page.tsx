import "./home.scss";
import Image from "next/image";

import Item from "@ui/Item";
export default function Home() {
  return (
    <main>
      <section className="main__section">
        <div className="main__section--text">
          <h1>Цифровая платформа подбора, обучения и диагностики приборов</h1>
          <p>
            Быстрый подбор оборудования, справка по эксплуатации и сертификация
            специалистов в одном месте
          </p>
        </div>
        <div className="main__section__images">
          <div></div>

          <Item text="Открыть справку" image="help.webp" extraClass="blue" />
          <Item text="Личный кабинет" image="profile.webp" extraClass="green" />
          <div></div>
          <div></div>
          <Item text="Подобрать прибор" image="filter.webp" extraClass="red" />
        </div>
      </section>
      <section className="popular">
        <h2>Популярные приборы</h2>
        <div className="popular__items">
          <div className="popular__items--item-wrapper">
            <div className="popular__items--item-image">
              <Image
                src="/images/item.webp"
                alt="РДЭ-Мастер-К-10-1.5"
                width={114}
                height={168}
              />
            </div>
            <p>РДЭ-Мастер-К-10-1.5</p>
          </div>
          <div className="popular__items--item-wrapper">
            <div className="popular__items--item-image">
              <Image
                src="/images/item.webp"
                alt="РДЭ-Мастер-К-10-1.5"
                width={114}
                height={168}
              />
            </div>
            <p>РДЭ-Мастер-К-10-1.5</p>
          </div>
          <div className="popular__items--item-wrapper">
            <div className="popular__items--item-image">
              <Image
                src="/images/item.webp"
                alt="РДЭ-Мастер-К-10-1.5"
                width={114}
                height={168}
              />
            </div>
            <p>РДЭ-Мастер-К-10-1.5</p>
          </div>
          <div className="popular__items--item-wrapper">
            <div className="popular__items--item-image">
              <Image
                src="/images/item.webp"
                alt="РДЭ-Мастер-К-10-1.5"
                width={114}
                height={168}
              />
            </div>
            <p>РДЭ-Мастер-К-10-1.5</p>
          </div>
        </div>
      </section>
    </main>
  );
}
