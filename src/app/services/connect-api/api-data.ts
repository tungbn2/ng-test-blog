export const BASE_URL = 'https://conduit.productionready.io';

export const Endpoints = {
  GetTags: '/api/tags',
};

export function EndpointsCommnent(slug: string, id?: string) {
  return {
    AddCommentsToArticle: `/api/articles/${slug}/comments`,
    GetCommentsFromArticle: `/api/articles/${slug}/comments`,
    DeleteComment: `/api/articles/${slug}/comments/${id}`,
  };
}

export function EndpointsUser(username: string) {
  return {
    GetProfile: `/api/profiles/${username}`,
    FollowUser: `/api/profiles/${username}/follow`,
    UnfollowUser: `/api/profiles/${username}/follow`,
  };
}

export function EndpointsArticles(slug?: string) {
  return {
    ListArticles: '/api/articles',
    FeedArticles: '/api/articles/feed',
    GetArticle: `/api/articles/${slug}`,
    CreateArticle: '/api/articles',
    UpdateArticle: `/api/articles/${slug}`,
    DeleteArticle: `/api/articles/${slug}`,
    FavoriteArticle: `/api/articles/${slug}/favorite`,
    UnfavoriteArticle: `/api/articles/${slug}/favorite`,
  };
}

export function EndpointsAuthen() {
  return {
    Login: '/api/users/login',
    Registration: '/api/users',
    GetCurrentUser: '/api/user',
    UpdateUser: '/api/user',
  };
}


