"use client";

import "./Header.scss";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import ProfileNav from "@ui/ProfileNav";
import Input from "@ui/Input";
import getUser from "@utils/getUser";
import NavMobile from "@ui/NavMobile";
import { useEffect, useRef, useState } from "react";
import { User } from "@mytypes/user";
import { useDebounce } from "@hooks/useDebounce";
import onGlobalSearch from "@utils/onGlobalSearch";
import { validateSearchResponse } from "@utils/validateSearchResponse";
import { SearchResponse, UnifiedSearchResult } from "@mytypes/search";

// Типы для результатов поиска

const Header = () => {
  const [data, setData] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<UnifiedSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin-extra") || false;
  const isAdminPanel = isAdminRoute || false;

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    async function fetchData() {
      const dataServ = await getUser();
      setData(dataServ);
    }

    fetchData();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Поиск при изменении debounced значения
  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      performSearch(debouncedSearchQuery);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [debouncedSearchQuery]);

  // Функция для унификации результатов поиска
  const unifySearchResults = (
    response: SearchResponse,
  ): UnifiedSearchResult[] => {
    const results: UnifiedSearchResult[] = [];

    // Обработка courses
    if (response.courses && response.courses.length > 0) {
      response.courses.forEach((course) => {
        if (course.title) {
          results.push({
            id: course.id || "",
            title: course.title,
            description: course.description || "Курс обучения",
            url: `/learning/${course.id}`,
            type: "course",
          });
        }
      });
    }

    // Обработка products
    if (response.products && response.products.length > 0) {
      response.products.forEach((product) => {
        if (product.title) {
          results.push({
            id: product.id || "",
            title: product.title,
            description: product.description
              ? product.description.substring(0, 150) + "..."
              : "Товар",
            url: `/selecting_device/${product.id}`,
            type: "product",
          });
        }
      });
    }

    // Обработка terms
    if (response.terms && response.terms.length > 0) {
      response.terms.forEach((term) => {
        if (term.title) {
          results.push({
            id: term.id || "",
            title: term.title,
            description: term.description || "Термин",
            url: `/help/terms`,
            type: "term",
          });
        }
      });
    }

    // Обработка errors
    if (response.errors && response.errors.length > 0) {
      response.errors.forEach((error) => {
        if (error.title) {
          results.push({
            id: error.id || "",
            title: error.title,
            description: error.description || "Ошибка",
            url: `/help/malfunction/${error.id}`,
            type: "error",
          });
        }
      });
    }

    // Обработка faqs
    if (response.faqs && response.faqs.length > 0) {
      response.faqs.forEach((faq, index) => {
        if (faq.title) {
          results.push({
            id: faq.id || `faq-${index}`,
            title: faq.title,
            description: faq.description || "Часто задаваемый вопрос",
            url: `/help/faq`,
            type: "faq",
          });
        }
      });
    }

    // Обработка recommendations
    if (response.recommendations && response.recommendations.length > 0) {
      response.recommendations.forEach((recommendation, index) => {
        if (recommendation.title) {
          results.push({
            id: recommendation.id || `rec-${index}`,
            title: recommendation.title,
            description: recommendation.description || "Рекомендация",
            url: `/help/recomendation`,
            type: "recommendation",
          });
        }
      });
    }

    return results;
  };

  const performSearch = async (query: string) => {
    setIsLoading(true);
    try {
      // ТИПИЗИРУЕМ как unknown сначала
      const rawResponse: unknown = await onGlobalSearch(query);

      // ВАЛИДИРУЕМ
      const response = validateSearchResponse(rawResponse);

      const unifiedResults = unifySearchResults(response);
      setSearchResults(unifiedResults);
      setShowResults(true);
    } catch (error) {
      console.error("Ошибка поиска:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleResultClick = (
    url: string,
    e: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    e.stopPropagation();
    e.preventDefault();
    router.push(url);
    setShowResults(false);
    setSearchQuery("");
  };

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter" && searchQuery.trim()) {
  //     router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  //     setShowResults(false);
  //   }
  // };

  // Функция для получения иконки типа результата
  const getTypeIcon = (type: UnifiedSearchResult["type"]) => {
    switch (type) {
      case "course":
        return "📚";
      case "product":
        return "🛒";
      case "term":
        return "📖";
      case "error":
        return "⚠️";
      case "faq":
        return "❓";
      case "recommendation":
        return "💡";
      default:
        return "📄";
    }
  };

  // Функция для получения label типа результата
  const getTypeLabel = (type: UnifiedSearchResult["type"]) => {
    switch (type) {
      case "course":
        return "Курс";
      case "product":
        return "Товар";
      case "term":
        return "Термин";
      case "error":
        return "Ошибка";
      case "faq":
        return "FAQ";
      case "recommendation":
        return "Рекомендация";
      default:
        return "Результат";
    }
  };

  const renderNavigation = () => {
    if (isAdminPanel) {
      // Админ-меню
      return (
        <ul>
          <li>
            <Link href="/admin-extra/">Статистика и активность</Link>
          </li>
          <li>
            <Link href="/admin-extra/courses">Управление курсами</Link>
          </li>
          <li>
            <Link href="/admin-extra/users">Проверка вопросов</Link>
          </li>
        </ul>
      );
    }

    // Обычное меню для пользователей
    return (
      <ul>
        <li>
          <Link href="/selecting_device">Подбор прибора</Link>
        </li>
        <li>
          <Link href={"/help"}>Справка</Link>
        </li>
        <li>
          <Link href={"/learning"}>Обучение</Link>
        </li>
      </ul>
    );
  };
  const renderMobileNavContent = () => {
    if (isAdminPanel) {
      return (
        <nav className="nav-mobile">
          <ul>
            <li>
              <Link
                href="/admin-extra/dashboard"
                onClick={() => setOpen(false)}
              >
                Статистика и активность
              </Link>
            </li>
            <li>
              <Link href="/admin-extra/courses" onClick={() => setOpen(false)}>
                Управление курсами
              </Link>
            </li>
            <li>
              <Link href="/admin-extra/users" onClick={() => setOpen(false)}>
                Проверка вопросов
              </Link>
            </li>
          </ul>
        </nav>
      );
    }

    return <NavMobile open={open} />;
  };

  return (
    <header className="site-header" ref={ref}>
      <button
        className="burger"
        aria-label="Открыть меню"
        onClick={() => setOpen(true)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <Link href="/">
        <Image src="/icon/logo.svg" alt="Логотип" width={116} height={72} />
      </Link>
      <nav>{renderNavigation()}</nav>
      {renderMobileNavContent()}

      {!isAdminPanel && (
        <div className="search-wrapper" ref={searchRef}>
          <Input
            className="nav--input"
            placeholder="Глобальный поиск..."
            value={searchQuery}
            onChange={handleSearchChange}
            // onKeyDown={handleKeyDown}
          />

          {showResults && (
            <div className="search-results-dropdown">
              {isLoading && <div className="search-loading">Поиск...</div>}

              {!isLoading && searchResults.length > 0 && (
                <>
                  {searchResults.map((result) => (
                    <Link
                      href={result.url}
                      key={`${result.type}-${result.id}`}
                      className="search-result-item"
                      onClick={(e) => handleResultClick(result.url, e)}
                    >
                      <div className="result-type-badge">
                        <span className="result-icon">
                          {getTypeIcon(result.type)}
                        </span>
                        <span className="result-type">
                          {getTypeLabel(result.type)}
                        </span>
                      </div>
                      <div className="result-title">{result.title}</div>
                      {result.description && result.description !== "Товар" && (
                        <div className="result-description">
                          {result.description}
                        </div>
                      )}
                    </Link>
                  ))}
                </>
              )}

              {!isLoading && searchQuery && searchResults.length === 0 && (
                <div className="search-no-results">
                  Ничего не найдено по запросу &quot;{searchQuery}&quot;
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <ProfileNav user={data ? data : null} />
    </header>
  );
};

export default Header;
