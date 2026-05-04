import "./style.scss";
import Image from "next/image";
import Link from "next/link";

export default function Help() {
  return (
    <main>
      <section className="help">
        <h1>Справка и поддержка</h1>
        <div className="help__content">
          <Link className="help__item help__item--1" href="/help/malfunction/">
            <Image
              src="/icon/lightning.svg"
              alt=""
              width={91.3520278930664}
              height={107.9626693725586}
            />
            <p className="help__item--title">Аварийные режимы</p>
            <p className="help__item--description">
              Инструкции для нештатных ситуаций
            </p>
          </Link>
          <Link
            className="help__item help__item--2"
            href="/help/recomendation/"
          >
            <Image
              src="/icon/advice.svg"
              alt=""
              width={118.95281219482422}
              height={118.95281219482422}
            />
            <p className="help__item--title">Рекомендации</p>
            <p className="help__item--description">
              Полезные советы по эксплуатации и обслуживанию приборов
            </p>
          </Link>
          <Link className="help__item help__item--3" href="/help/terms/">
            <Image
              src="/icon/term.svg"
              alt=""
              width={75.57455444335938}
              height={107.96361541748047}
            />
            <p className="help__item--title">Термины</p>
            <p className="help__item--description">
              Простые объяснения технических терминов
            </p>
          </Link>
          <Link className="help__item help__item--4" href="/help/faq/">
            <Image
              src="/icon/faq.svg"
              alt=""
              width={107.96192169189453}
              height={107.96192169189453}
            />
            <p className="help__item--title">FAQ</p>
            <p className="help__item--description">
              Быстрые ответы на популярные вопросы клиентов.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
