"use client";
import { useState } from "react";
import "./style.scss";
import Image from "next/image";
import Malfunction from "@sections/Malfunction";

export default function Help() {
  const [isOpenHelp, setIsOpenHelp] = useState(false);
  const [openedHelp, setOpenedHelp] = useState("");

  const handleBack = () => {
    setIsOpenHelp(false);
  };

  const handleSetterOpenedHelp = (arg: string) => {
    setIsOpenHelp(true);
    setOpenedHelp(arg);
  };

  const chooseElem = () => {
    switch (openedHelp) {
      case "malfunction":
        return <Malfunction handleBack={handleBack} />;
        break;

      default:
        break;
    }
  };

  return (
    <main>
      {!isOpenHelp && (
        <section className="help">
          <h1>Справка и поддержка</h1>
          <div className="help__content">
            <div
              className="help__item help__item--1"
              onClick={() => handleSetterOpenedHelp("malfunction")}
            >
              <Image
                src="/icon/lightning.svg"
                alt=""
                width={91.3520278930664}
                height={107.9626693725586}
              />
              <p className="help__item--title">Аварийные режимы</p>
              <p className="help__item--description">
                Тип текста-заполнителя, обычно используемый в дизайне
              </p>
            </div>
            <div className="help__item help__item--2">
              <Image
                src="/icon/advice.svg"
                alt=""
                width={118.95281219482422}
                height={118.95281219482422}
              />
              <p className="help__item--title">Рекомендации</p>
              <p className="help__item--description">
                Тип текста-заполнителя, обычно используемый в дизайне
              </p>
            </div>
            <div className="help__item help__item--3">
              <Image
                src="/icon/term.svg"
                alt=""
                width={75.57455444335938}
                height={107.96361541748047}
              />
              <p className="help__item--title">Термины</p>
              <p className="help__item--description">
                Тип текста-заполнителя, обычно используемый в дизайне
              </p>
            </div>
            <div className="help__item help__item--4">
              <Image
                src="/icon/faq.svg"
                alt=""
                width={107.96192169189453}
                height={107.96192169189453}
              />
              <p className="help__item--title">FAQ</p>
              <p className="help__item--description">
                Тип текста-заполнителя, обычно используемый в дизайне
              </p>
            </div>
          </div>
        </section>
      )}
      {isOpenHelp && <section>{chooseElem()}</section>}
    </main>
  );
}
