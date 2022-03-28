import { Recipe } from '@core/models/recipe.model';
import { QueryParams } from '@core/values/query-params.enum';
import { ApiEndpoints } from '@core/values/api-endpoints.enum';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MockRundomRecipes } from 'app/__mock__/random-recipes';
import { SearchParamType } from '@features/search/types/search-param.type';
import { RandomRecipesResponce } from '@core/types/random-recipes-responce.type';
import { SearchRecipesResponce } from '@core/types/search-recipes-responce.type';
import { MockSearchRecipes } from 'app/__mock__/short-search-recipes';

@Injectable()
export class RecipesApi {
  constructor(private httpClient: HttpClient) {}

  getRandomRecipes(count: number): Observable<RandomRecipesResponce> {
    // return this.httpClient.get<RandomRecipesResponce>(
    //   `${ApiEndpoints.RECIPES}/${ApiEndpoints.RANDOM}`,
    //   {
    //     params: {
    //       [QueryParams.NUMBER]: `${count}`,
    //     },
    //   },
    // );
    return of({ recipes: MockRundomRecipes });
  }

  getRecipe(id: number): Observable<Recipe> {
    // return this.httpClient.get<Recipe>(
    //   `${ApiEndpoints.RECIPES}/${id}/${ApiEndpoints.INFORMATION}`,
    // );

    return of([...MockRundomRecipes].find((recipes) => recipes.id === id));
  }

  searchRecipes(
    query: string,
    queryParams: SearchParamType,
    maxResults = 2,
  ): Observable<SearchRecipesResponce> {
    // return this.httpClient.get<SearchRecipesResponce>(
    //   `${ApiEndpoints.RECIPES}/${ApiEndpoints.COMPLEX_SEARCH}`,
    //   {
    //     params: {
    //       [QueryParams.QUERY]: query,
    //       [QueryParams.NUMBER]: maxResults,
    //       ...queryParams,
    //     },
    //   },
    // );

    return of({
      offset: 1,
      number: 1,
      totalResults: 1,
      results: MockSearchRecipes,
    });
  }
}
