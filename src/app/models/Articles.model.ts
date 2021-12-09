import { ProfileData } from './Profile.model';

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: ProfileData;
}

export interface SingleArticle {
  article: Article;
}

export interface MultiArticles {
  articles: Article[];
  articlesCount: number;
}

export interface NewArticle {
  article: ArticleData
}

export interface ArticleData {
  title?: string;
  description?: string;
  body?: string;
  tagList?: string[];
}

export interface UpdateArticle {
  article: ArticleData;
}

export interface Comment {
  id: string;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: ProfileData;
}

export interface SingleComment {
  comment: Comment;
}

export interface MultiComments {
  comments: Comment[];
}

export interface NewComment {
  comment: {
    body: string;
  };
}

export interface Tags {
  tags: string[];
}

export interface CurrentArticleAndProfile {
  currentArticle: Article;
  author: ProfileData;
}
