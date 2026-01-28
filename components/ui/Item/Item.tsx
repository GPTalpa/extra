import Image from "next/image";
import Link from "next/link";

interface IItem {
  text: string;
  image: string;
  extraClass?: string;
  href: string;
}

const Item = ({ text, image, extraClass, href }: IItem) => {
  return (
    <Link
      className={`main__section__images--item ${extraClass ? `main__section__images--item--${extraClass}` : ""}`}
      href={href}
    >
      <Image src={`/images/${image}`} alt={text} width={64} height={64} />
      <p>{text}</p>
    </Link>
  );
};

export default Item;
