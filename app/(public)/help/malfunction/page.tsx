// app/(public)/help/malfunction/page.tsx
"use client";

import Input from "@ui/Input";
import "../style.scss";
import "./style.scss";

import Image from "next/image";
import { useState } from "react";
import { useDebounce } from "@hooks/useDebounce";
import PressureSwitch from "@sections/Malfunction/PressureSwitch";
import Link from "next/link";

const MalfunctionPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInput = (value: string) => {
    setSearchTerm(value);
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <>
      <div className="malfunctiom">
        <div className="help__header">
          <Link className="help--back" href="/help/">
            <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
            Назад
          </Link>
        </div>
        <div className="malfunctiom__header">
          <Input
            className="malfunctiom__header--input"
            placeholder="Введите серийный номер, проблему или название..."
            onChange={handleInput}
            value={searchTerm}
          />
        </div>
        <PressureSwitch input={debouncedSearchTerm} />
      </div>
    </>
  );
};

export default MalfunctionPage;
