import "./style.scss";
import Image from "next/image";

interface IInput {
  placeholder: string;
  className?: string;
  isMobile?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const Input = ({
  placeholder,
  className,
  isMobile = false,
  value = "",
  onChange,
}: IInput) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

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
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
