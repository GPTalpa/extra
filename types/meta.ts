export interface IPageMeta {
  title: string;
  description: string;
  keywords?: string;
  icons?: {
    icon?: {
      url: string;
      sizes: string;
      type?: string;
    }[];
    apple?: string;
  };
  authorName?: string;
  slug?: string;
  url?: string;
}
