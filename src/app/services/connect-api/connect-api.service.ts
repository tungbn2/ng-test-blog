import {
  AuthUser,
  loginData,
  NewUser,
  UpdateUser,
} from 'src/app/models/User.model';
import { SingleArticle } from './../../models/Articles.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MultiArticles,
  NewArticle,
  UpdateArticle,
  SingleComment,
  NewComment,
  MultiComments,
  Tags,
} from 'src/app/models/Articles.model';
import { Profile } from 'src/app/models/Profile.model';
import * as Api from './api-data';
import { OtherModel } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class ConnectApiService {
  private get ApiHeaderWithToken() {
    const token: string = JSON.parse(
      localStorage.getItem('userBlogData') || ''
    )?.token;
    return {
      headers: new HttpHeaders({
        authorization: token ? 'Bearer ' + token : '',
      }),
    };
  }

  constructor(private http: HttpClient) {}

  Login(loginData: loginData) {
    return this.http.post<AuthUser>(
      Api.BASE_URL + Api.EndpointsAuthen().Login,
      loginData
    );
  }

  Registration(newUser: NewUser) {
    return this.http.post<AuthUser>(
      Api.BASE_URL + Api.EndpointsAuthen().Registration,
      newUser
    );
  }

  GetCurrentUser() {
    return this.http.get<AuthUser>(
      Api.BASE_URL + Api.EndpointsAuthen().GetCurrentUser,
      this.ApiHeaderWithToken
    );
  }

  PutUpdateUser(updateUser: UpdateUser) {
    return this.http.put<AuthUser>(
      Api.BASE_URL + Api.EndpointsAuthen().UpdateUser,
      updateUser,
      this.ApiHeaderWithToken
    );
  }

  GetProfile(username: string) {
    return this.http.get<Profile>(
      Api.BASE_URL + Api.EndpointsUser(username).GetProfile,
      this.ApiHeaderWithToken
    );
  }

  PostFollowUser(username: string) {
    return this.http.post<Profile>(
      Api.BASE_URL + Api.EndpointsUser(username).FollowUser,
      {},
      this.ApiHeaderWithToken
    );
  }

  DeleteUnfollowUser(username: string) {
    return this.http.delete<Profile>(
      Api.BASE_URL + Api.EndpointsUser(username).FollowUser,
      this.ApiHeaderWithToken
    );
  }

  GetListArticles(GetArticlesParams: OtherModel.getArticleParam) {
    let params = new HttpParams({
      fromObject: GetArticlesParams as any,
    });

    const token: string = localStorage.getItem('userBlogData')
      ? JSON.parse(localStorage.getItem('userBlogData') || '')?.token
      : '';

    return this.http.get<MultiArticles>(
      Api.BASE_URL + Api.EndpointsArticles().ListArticles,
      {
        params,
        headers: new HttpHeaders({
          authorization: token ? 'Bearer ' + token : '',
        }),
      }
    );
  }

  GetFeedArticles() {
    return this.http.get<MultiArticles>(
      Api.BASE_URL + Api.EndpointsArticles().FeedArticles,
      this.ApiHeaderWithToken
    );
  }

  GetArticleBySlug(slug: string) {
    return this.http.get<SingleArticle>(
      Api.BASE_URL + Api.EndpointsArticles(slug).GetArticle,
      this.ApiHeaderWithToken
    );
  }

  PostCreateArticle(newArticle: NewArticle) {
    return this.http.post<SingleArticle>(
      Api.BASE_URL + Api.EndpointsArticles().CreateArticle,
      newArticle,
      this.ApiHeaderWithToken
    );
  }

  PutUpdateArticle(updateArticle: UpdateArticle, slug: string) {
    return this.http.put<SingleArticle>(
      Api.BASE_URL + Api.EndpointsArticles(slug).UpdateArticle,
      updateArticle,
      this.ApiHeaderWithToken
    );
  }

  DeleteArticle(slug: string) {
    return this.http.delete(
      Api.BASE_URL + Api.EndpointsArticles(slug).DeleteArticle,
      this.ApiHeaderWithToken
    );
  }

  PostAddCommentsToArticle(slug: string, newComment: NewComment) {
    return this.http.post<SingleComment>(
      Api.BASE_URL + Api.EndpointsCommnent(slug).AddCommentsToArticle,
      newComment,
      this.ApiHeaderWithToken
    );
  }

  GetCommentsFromArticle(slug: string) {
    return this.http.get<MultiComments>(
      Api.BASE_URL + Api.EndpointsCommnent(slug).GetCommentsFromArticle,
      this.ApiHeaderWithToken
    );
  }

  DeleteComment(slug: string, id: string) {
    return this.http.delete(
      Api.BASE_URL + Api.EndpointsCommnent(slug, id).DeleteComment,
      this.ApiHeaderWithToken
    );
  }

  PostFavoriteArticle(slug: string) {
    return this.http.post<SingleArticle>(
      Api.BASE_URL + Api.EndpointsArticles(slug).FavoriteArticle,
      {},
      this.ApiHeaderWithToken
    );
  }

  DeleteUnfavoriteArticle(slug: string) {
    return this.http.delete<SingleArticle>(
      Api.BASE_URL + Api.EndpointsArticles(slug).UnfavoriteArticle,
      this.ApiHeaderWithToken
    );
  }

  GetTags() {
    return this.http.get<Tags>(
      Api.BASE_URL + Api.Endpoints.GetTags,
      this.ApiHeaderWithToken
    );
  }
}
