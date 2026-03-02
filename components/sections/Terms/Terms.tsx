"use client";

import "./style.scss";

import Image from "next/image";

interface ITerms {
  handleBack: () => void;
}

const Terms = ({ handleBack }: ITerms) => {
  return (
    <div className="terms">
      <button className="help--back" onClick={handleBack}>
        <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
        Назад
      </button>
    </div>
  );
};

export default Terms;
