import { RecipesApi } from '@core/api/recipes.api';
import { Injectable } from '@angular/core';
import { SearchParamType } from '@features/search/types/search-param.type';
import { QueryParamsUtil } from '@features/search/utils/query-params.util';
import { SearchRecipesResponce } from '@core/types/search-recipes-responce.type';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ShortRecipe } from '@core/models/short-recipe.model';

@Injectable()
export class SearchService {
  constructor(private recipesApi: RecipesApi) {}

  private mapSearchResult = ({ results }: SearchRecipesResponce) => results;

  search(
    queryText: string,
    params: SearchParamType,
  ): Observable<ShortRecipe[]> {
    return this.recipesApi
      .searchRecipes(queryText, QueryParamsUtil.removeEmpty(params))
      .pipe(map(this.mapSearchResult));
  }
}
