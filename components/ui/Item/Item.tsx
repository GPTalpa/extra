"use client";

import "./style.scss";

import Image from "next/image";
import { useUIStore } from "store";

interface IItem {
  text: string;
  image: string;
  extraClass?: string;
}

const Item = ({ text, image, extraClass }: IItem) => {
  const { profileOpen } = useUIStore();

  return (
    <div
      className={`main__section__images--item ${extraClass ? `main__section__images--item--${extraClass}` : ""}`}
      style={profileOpen ? { zIndex: -1 } : { zIndex: 1 }}
    >
      <Image src={`/images/${image}`} alt={text} width={64} height={64} />
      <p>{text}</p>
    </div>
  );
};

export default Item;
