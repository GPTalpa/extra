import Image from "next/image";

interface IMalfunction {
  handleClickMalfunction: (event: boolean) => void;
}

const PressureSwitch = ({ handleClickMalfunction }: IMalfunction) => {
  return (
    <div className="malfunctiom__content">
      <div
        className="malfunctiom__content__item"
        onClick={() => handleClickMalfunction(true)}
      >
        <div className="malfunctiom__content__item--left">
          <p>Какая то проблема</p>
          <Image
            src="/images/error.png"
            width={112.4537353515625}
            height={59.19719696044922}
            alt=""
          />
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="33"
          height="33"
          viewBox="0 0 33 33"
          fill="none"
        >
          <path
            d="M1.06055 1.06055L30.7011 30.7008M30.7011 30.7008V1.06055M30.7011 30.7008H1.06055"
            stroke="currentColor"
            stroke-width="3"
          />
        </svg>
      </div>
      <div
        className="malfunctiom__content__item"
        onClick={() => handleClickMalfunction(true)}
      >
        <div className="malfunctiom__content__item--left">
          <p>Какая то проблема</p>
          <Image
            src="/images/error.png"
            width={112.4537353515625}
            height={59.19719696044922}
            alt=""
          />
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="33"
          height="33"
          viewBox="0 0 33 33"
          fill="none"
        >
          <path
            d="M1.06055 1.06055L30.7011 30.7008M30.7011 30.7008V1.06055M30.7011 30.7008H1.06055"
            stroke="currentColor"
            stroke-width="3"
          />
        </svg>
      </div>
      <div
        className="malfunctiom__content__item"
        onClick={() => handleClickMalfunction(true)}
      >
        <div className="malfunctiom__content__item--left">
          <p>Какая то проблема</p>
          <Image
            src="/images/error.png"
            width={112.4537353515625}
            height={59.19719696044922}
            alt=""
          />
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="33"
          height="33"
          viewBox="0 0 33 33"
          fill="none"
        >
          <path
            d="M1.06055 1.06055L30.7011 30.7008M30.7011 30.7008V1.06055M30.7011 30.7008H1.06055"
            stroke="currentColor"
            stroke-width="3"
          />
        </svg>
      </div>
      <div
        className="malfunctiom__content__item"
        onClick={() => handleClickMalfunction(true)}
      >
        <div className="malfunctiom__content__item--left">
          <p>Какая то проблема</p>
          <Image
            src="/images/error.png"
            width={112.4537353515625}
            height={59.19719696044922}
            alt=""
          />
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="33"
          height="33"
          viewBox="0 0 33 33"
          fill="none"
        >
          <path
            d="M1.06055 1.06055L30.7011 30.7008M30.7011 30.7008V1.06055M30.7011 30.7008H1.06055"
            stroke="currentColor"
            stroke-width="3"
          />
        </svg>
      </div>
      <div
        className="malfunctiom__content__item"
        onClick={() => handleClickMalfunction(true)}
      >
        <div className="malfunctiom__content__item--left">
          <p>Какая то проблема</p>
          <Image
            src="/images/error.png"
            width={112.4537353515625}
            height={59.19719696044922}
            alt=""
          />
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="33"
          height="33"
          viewBox="0 0 33 33"
          fill="none"
        >
          <path
            d="M1.06055 1.06055L30.7011 30.7008M30.7011 30.7008V1.06055M30.7011 30.7008H1.06055"
            stroke="currentColor"
            stroke-width="3"
          />
        </svg>
      </div>
    </div>
  );
};

export default PressureSwitch;
