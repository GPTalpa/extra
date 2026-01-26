"use client";

import "./style.scss";

import Image from "next/image";
import { useUIStore } from "store";

interface IInput {
  placeholder: string;
  className?: string;
}

const Input = ({ placeholder, className }: IInput) => {
  const { profileOpen, toggleProfile } = useUIStore();

  return (
    <div className={`search__bar ${className ? className : ""}`}>
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
      <input type="text" placeholder={placeholder} />
      <button className="btn btn-primaty--active">
        <Image src="/icon/search_black.svg" alt="" width={21} height={21} />
      </button>
    </div>
  );
};

export default Input;
