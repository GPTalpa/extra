export type Products = {
  id: string;
  title: string;
  description: string;
  documentation: string;
  schema_connect: string;
  attributes: Record<string, unknown>;
  image_url: string[];
  article: string;
};
