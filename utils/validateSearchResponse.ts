import { SearchResponse, SearchResult } from "@mytypes/search";

function isValidSearchResult(obj: any): obj is SearchResult {
  if (!obj || typeof obj !== 'object') return false;
  // Проверяем только наличие полей, которые могут быть undefined
  return true; // SearchResult все поля опциональные
}

export function validateSearchResponse(data: unknown): SearchResponse {
  // Базовый объект с пустыми массивами
  const defaultResponse: SearchResponse = {
    courses: [],
    products: [],
    terms: [],
    errors: [],
    faqs: [],
    recommendations: []
  };

  // Если данные не объект или null - возвращаем пустой ответ
  if (!data || typeof data !== 'object') {
    return defaultResponse;
  }

  const obj = data as any;
  const result: SearchResponse = { ...defaultResponse };

  // Для каждого ключа проверяем, что это массив
  const keys: (keyof SearchResponse)[] = ['courses', 'products', 'terms', 'errors', 'faqs', 'recommendations'];
  
  for (const key of keys) {
    if (obj[key] && Array.isArray(obj[key])) {
      result[key] = obj[key];
    }
  }

  return result;
}