import "./style.scss";

import Image from "next/image";

interface ICourse {
  handleBack: () => void;
}

const Course = ({ handleBack }: ICourse) => {
  return (
    <div className="course">
      <button className="course--back" onClick={handleBack}>
        <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
        Назад
      </button>

      <div className="course__content">
        <div className="course__video"></div>
        <div className="course__text"></div>
      </div>
    </div>
  );
};

export default Course;
