import { useState, useRef, useEffect, FC, ChangeEvent } from "react";

// Тип для опции select
interface SelectOption {
  key: string;
  name: string;
}

// Тип для события onChange
export interface SelectChangeEvent {
  target: {
    value: string;
    name: string;
  };
}

// Пропсы компонента
interface CustomSelectProps {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  options: readonly SelectOption[];
  placeholder: string;
  withErrors: boolean;
}

const CustomSelect: FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  withErrors,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLabel, setSelectedLabel] = useState<string>(placeholder);
  const selectRef = useRef<HTMLDivElement>(null);

  // Находим выбранную опцию
  useEffect(() => {
    const selected = options.find((opt) => opt.key === value);
    setSelectedLabel(selected ? selected.name : placeholder);
  }, [value, options, placeholder]);

  // Закрытие при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (key: string, name: string): void => {
    onChange({ target: { value: key, name: "role" } });
    setSelectedLabel(name);
    setIsOpen(false);
  };

  return (
    <div className={`custom-select`} ref={selectRef}>
      <div
        className={`custom-select__trigger ${isOpen ? "open" : ""} ${withErrors ? "with-error" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`custom-select__value ${selectedLabel !== "Роль" ? "colored" : ""}`}
        >
          {selectedLabel}
        </span>
      </div>

      {isOpen && (
        <div className="custom-select__dropdown">
          {options.map((option) => (
            <div
              key={option.key}
              className={`custom-select__option ${value === option.key ? "selected" : ""}`}
              onClick={() => handleSelect(option.key, option.name)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
