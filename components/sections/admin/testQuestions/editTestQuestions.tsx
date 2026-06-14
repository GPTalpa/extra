"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "./style.scss";
import { courseTest } from "@mytypes/courseTest";
import { Option } from "@mytypes/courseTest";
import editQuestion from "@utils/admin/editQuestion";

type Variant = {
  id: string | number;
  value: string;
};

type TestQuestionsProps = {
  num: number;
  blockId?: string | null;
};

const EditTestQuestions = ({
  num,
  blockId,
  data,
}: TestQuestionsProps & { data: courseTest }) => {
  const [questionTitle, setQuestionTitle] = useState(() =>
    data ? data.text : "",
  );
  const [questionType, setQuestionType] = useState<string | undefined>(
    "single_choice",
  );
  const [isOpen, setIsOpen] = useState(false);

  const [optionsData, setOptionsData] = useState<Option[]>([]);
  const [correctVariantId, setCorrectVariantId] = useState<string | null>("");
  const [selectedVariantIds, setSelectedVariantIds] = useState<string[]>([]);
  const [textAnswer, setTextAnswer] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // console.log(data);

  useEffect(() => {
    if (data.question_type === "single_choice") {
      data.options.forEach((elem) => {
        if (elem.is_correct) {
          setCorrectVariantId(elem.id);
        }
      });
    }

    if (data.question_type === "multiple_choice") {
      data.options.forEach((elem) => {
        if (elem.is_correct) {
          setSelectedVariantIds((prev) => [...prev, elem.id]);
        }
      });
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOptionsData(data.options);
    setQuestionType(data.question_type);
  }, [data]);

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
    setOptionsData((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        text: "",
      },
    ]);
  };

  const toggleSelectedVariant = (variantId: string) => {
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

    const preparedVariants = optionsData
      .map((variant, index) => ({
        text: variant.text.trim(),
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
      await editQuestion(data.id, {
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
              {optionsData?.map((variant, index) => (
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
                    value={variant.text}
                    onChange={(e) =>
                      setOptionsData((prev) =>
                        prev.map((item) =>
                          item.id === variant.id
                            ? { ...item, text: e.target.value }
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
              {optionsData?.map((variant, index) => (
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
                    value={variant.text}
                    onChange={(e) =>
                      setOptionsData((prev) =>
                        prev.map((item) =>
                          item.id === variant.id
                            ? { ...item, text: e.target.value }
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

export default EditTestQuestions;
