export type SearchResult = {
  id?: string;
  title?: string;
  description?: string;
  image_url?: string[];
  documentation?: string;
  article?: string | null;
  views?: number;
  attributes?: Record<string, any>;
};

export type SearchResponse = {
  courses: SearchResult[];
  products: SearchResult[];
  terms: SearchResult[];
  errors: SearchResult[];
  faqs: SearchResult[];
  recommendations: SearchResult[];
};

// Тип для унифицированного результата
export type UnifiedSearchResult = {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "course" | "product" | "term" | "error" | "faq" | "recommendation";
};
