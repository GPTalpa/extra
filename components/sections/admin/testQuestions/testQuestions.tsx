"use client";

import Image from "next/image";
import { useState } from "react";
import "./style.scss";
import createQuestion from "@utils/admin/createQuestion";

type Variant = {
  id: number;
  value: string;
};

type TestQuestionsProps = {
  num: number;
  blockId?: string | null;
};

const TestQuestions = ({ num, blockId }: TestQuestionsProps) => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionType, setQuestionType] = useState("single_choice");
  const [isOpen, setIsOpen] = useState(false);
  const [variants, setVariants] = useState<Variant[]>([{ id: 1, value: "" }]);
  const [correctVariantId, setCorrectVariantId] = useState<number | null>(1);
  const [selectedVariantIds, setSelectedVariantIds] = useState<number[]>([1]);
  const [textAnswer, setTextAnswer] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const options = [
    {
      id: "single_choice",
      title: "один из вариантов",
      icon: "/icon/document.svg",
    },
    {
      id: "multiple_choice",
      title: "несколько вариантов",
      icon: "/icon/gear.svg",
    },
    {
      id: "free_text",
      title: "текстовый вариант",
      icon: "/icon/advice.svg",
    },
  ];

  const currentOption = options.find((option) => option.id === questionType);

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        id: Date.now(),
        value: "",
      },
    ]);
  };

  const toggleSelectedVariant = (variantId: number) => {
    setSelectedVariantIds((prev) =>
      prev.includes(variantId)
        ? prev.filter((id) => id !== variantId)
        : [...prev, variantId],
    );
  };

  const handleSaveQuestion = async () => {
    if (!blockId || !questionTitle.trim()) {
      return;
    }

    const preparedVariants = variants
      .map((variant, index) => ({
        text: variant.value.trim(),
        order_index: index + 1,
        is_correct:
          questionType === "single_choice"
            ? variant.id === correctVariantId
            : questionType === "multiple_choice"
              ? selectedVariantIds.includes(variant.id)
              : false,
      }))
      .filter((variant) => variant.text.length > 0);

    setIsSaving(true);

    try {
      await createQuestion(blockId, {
        text: questionTitle.trim(),
        question_type: questionType,
        options: questionType === "free_text" ? [] : preparedVariants,
        answer_text:
          questionType === "free_text" ? textAnswer.trim() : undefined,
      });
      setIsOpen(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="question">
      <div className="question__column">
        <div className="question__title">
          <span style={{ color: "rgba(250, 40, 40, 1)" }}>*</span> Вопрос{" "}
          <span style={{ color: "rgba(250, 40, 40, 1)" }}>№{num}</span>
        </div>
        <input
          className="question--input"
          placeholder="Описание вопроса"
          value={questionTitle}
          onChange={(e) => setQuestionTitle(e.target.value)}
        />

        {questionType === "single_choice" ? (
          <div className="question__variants">
            <div className="question__variants-head">
              <span className="question__variants-title">Вариант</span>
              <span className="question__variants-hint">
                Выберите верный ответ
              </span>
            </div>

            <div className="question__variants-list">
              {variants.map((variant, index) => (
                <div className="question__variant" key={variant.id}>
                  <label
                    className="question__variant-correct"
                    title="Верный вариант"
                  >
                    <input
                      type="radio"
                      name={`correct-variant-${num}`}
                      checked={correctVariantId === variant.id}
                      onChange={() => setCorrectVariantId(variant.id)}
                    />
                    <span className="question__variant-correct-mark"></span>
                  </label>

                  <input
                    className="question__variant-input"
                    value={variant.value}
                    onChange={(e) =>
                      setVariants((prev) =>
                        prev.map((item) =>
                          item.id === variant.id
                            ? { ...item, value: e.target.value }
                            : item,
                        ),
                      )
                    }
                    placeholder={`Вариант ${index + 1}`}
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="question__add-variant"
              onClick={addVariant}
            >
              <span className="question__add-variant-icon">+</span>
              Добавить вариант
            </button>
          </div>
        ) : questionType === "multiple_choice" ? (
          <div className="question__variants">
            <div className="question__variants-head">
              <span className="question__variants-title">Вариант</span>
              <span className="question__variants-hint">
                Выберите несколько вариантов
              </span>
            </div>

            <div className="question__variants-list">
              {variants.map((variant, index) => (
                <div className="question__variant" key={variant.id}>
                  <label
                    className="question__variant-correct question__variant-correct--multiple"
                    title="Отметить вариант"
                  >
                    <input
                      type="checkbox"
                      checked={selectedVariantIds.includes(variant.id)}
                      onChange={() => toggleSelectedVariant(variant.id)}
                    />
                    <span className="question__variant-correct-mark"></span>
                  </label>

                  <input
                    className="question__variant-input"
                    value={variant.value}
                    onChange={(e) =>
                      setVariants((prev) =>
                        prev.map((item) =>
                          item.id === variant.id
                            ? { ...item, value: e.target.value }
                            : item,
                        ),
                      )
                    }
                    placeholder={`Вариант ${index + 1}`}
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="question__add-variant"
              onClick={addVariant}
            >
              <span className="question__add-variant-icon">+</span>
              Добавить вариант
            </button>
          </div>
        ) : (
          // <div className="question__variants">
          //   <div className="question__variants-head">
          //     <span className="question__variants-title">Ответ</span>
          //     <span className="question__variants-hint">
          //       Введите текстовый ответ
          //     </span>
          //   </div>

          //   <input
          //     className="question__text-answer"
          //     value={textAnswer}
          //     onChange={(e) => setTextAnswer(e.target.value)}
          //     placeholder="Текстовый ответ"
          //   />
          // </div>
          <></>
        )}
      </div>

      <div className="question__column">
        <div className="question__title">
          <span style={{ color: "rgba(250, 40, 40, 1)" }}>*</span> Выберите тип
          вопроса
        </div>
        <div className="question__select">
          <button
            type="button"
            className={`question__option question__option--trigger ${isOpen ? "question__option--trigger-open" : ""}`}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <span className="question__option-icon">
              <Image
                src={currentOption?.icon || "/icon/document.svg"}
                alt=""
                width={18}
                height={18}
              />
            </span>
            <span className="question__option-text">
              {currentOption?.title}
            </span>
            <span className="question__option-arrow question__option-arrow--trigger">
              <Image
                src="/icon/arrow-right.svg"
                alt=""
                width={16}
                height={16}
              />
            </span>
          </button>

          {isOpen ? (
            <div
              className="question__options"
              role="listbox"
              aria-label={`Тип вопроса №${num}`}
            >
              {options.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  className={`question__option question__option--menu ${questionType === option.id ? "question__option--active" : ""}`}
                  onClick={() => {
                    setQuestionType(option.id);
                    setIsOpen(false);
                  }}
                  role="option"
                  aria-selected={questionType === option.id}
                >
                  <span className="question__option-icon">
                    <Image src={option.icon} alt="" width={18} height={18} />
                  </span>
                  <span className="question__option-text">{option.title}</span>
                  <span className="question__option-arrow">
                    <Image
                      src="/icon/arrow-right.svg"
                      alt=""
                      width={16}
                      height={16}
                    />
                  </span>
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <button
          type="button"
          className="question__save-question"
          onClick={handleSaveQuestion}
          disabled={isSaving || !blockId || !questionTitle.trim()}
        >
          {isSaving ? "Сохранение..." : "Сохранить вопрос"}
        </button>
      </div>
    </div>
  );
};

export default TestQuestions;
