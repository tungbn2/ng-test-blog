export interface Errors {
  errors: {
    body: string[];
  };
}

export interface getArticleParam {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
}
