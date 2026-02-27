"use client";

import "./style.scss";

import Image from "next/image";

interface IFaq {
  handleBack: () => void;
}

const Faq = ({ handleBack }: IFaq) => {
  return (
    <div className="help-faq">
      <div className="help__header">
        <button className="help--back" onClick={handleBack}>
          <Image src="/icon/back.svg" alt="" width={8.5} height={15} />
          Назад
        </button>
      </div>
      <div className="help-faq__content">
        <h2>FAQ</h2>
        <div className="faq_right">
          <details className="faq__item" id="faq-q1">
            <summary className="faq__summary">
              <span className="faq__item--question">Какой то вопрос?</span>
              <span className="faq__chev" aria-hidden="true">
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
              </span>
            </summary>
            <div className="faq__content">
              <p>
                Лорем Ипсум — это тип текста-заполнителя, обычно используемый в
                дизайне и издательском деле для заполнения пространства на
                странице и создания впечатления о том, как будет выглядеть
                конечный контент. Лорем Ипсум на русском языке происходит от
                латинского текста римского философа Цицерона и используется с
                1960-х годов. Текст бессмысленный и не несет никакого
                конкретного смысла, позволяя дизайнерам сосредоточиться на
                макете и визуальных элементах, не отвлекаясь на значимый
                контент.
              </p>
            </div>
          </details>
          <details className="faq__item" id="faq-q2">
            <summary className="faq__summary">
              <span className="faq__item--question">Еще один?</span>
              <span className="faq__chev" aria-hidden="true">
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
              </span>
            </summary>
            <div className="faq__content">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos
                natus debitis deleniti, sed reiciendis est facilis odio
                distinctio, ipsam cumque, ratione tempora hic accusantium? Atque
                quidem laborum unde perspiciatis molestias?
              </p>
            </div>
          </details>
          <details className="faq__item" id="faq-q3">
            <summary className="faq__summary">
              <span className="faq__item--question">Еще один?</span>
              <span className="faq__chev" aria-hidden="true">
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
              </span>
            </summary>
            <div className="faq__content">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias,
                laudantium. At dicta similique cumque nam consequatur quas
                quibusdam ipsa doloremque nobis! Magni eveniet quo officia
                veritatis natus quis? Nihil, harum.
              </p>
            </div>
          </details>
          <details className="faq__item" id="faq-q4">
            <summary className="faq__summary">
              <span className="faq__item--question">Вопрос</span>
              <span className="faq__chev" aria-hidden="true">
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
              </span>
            </summary>
            <div className="faq__content">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum
                tempora modi omnis nobis expedita, aliquam optio est ipsa. Nulla
                dolor quidem ratione labore deleniti? Tempora sit cupiditate
                quis repellat provident?
              </p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default Faq;
