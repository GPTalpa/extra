import "./home.scss";
import Image from "next/image";

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
          <div className="main__section__images--item main__section__images--item--blue">
            <Image
              src="/images/help.webp"
              alt="Открыть справку"
              width={64}
              height={64}
            />
            <p>Открыть справку</p>
          </div>
          <div className="main__section__images--item main__section__images--item--green">
            <Image
              src="/images/profile.webp"
              alt="Личный кабинет"
              width={64}
              height={64}
            />
            <p>Личный кабинет</p>
          </div>
          <div></div>
          <div></div>
          <div className="main__section__images--item main__section__images--item--red">
            <Image
              src="/images/filter.webp"
              alt="Подобрать прибор"
              width={64}
              height={64}
            />
            <p>Подобрать прибор</p>
          </div>
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
