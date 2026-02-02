import "./style.scss";

import Image from "next/image";

interface IInput {
  placeholder: string;
  className?: string;
  isMobile?: boolean;
}

const Input = ({ placeholder, className, isMobile = false }: IInput) => {
  return (
    <div
      className={
        isMobile
          ? `search__bar--mobile ${className ? className : ""}`
          : `search__bar ${className ? className : ""}`
      }
    >
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
