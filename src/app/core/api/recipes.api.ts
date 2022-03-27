import { Recipe } from '@core/models/recipe.model';
import { QueryParams } from '@core/values/query-params.enum';
import { ApiEndpoints } from '@core/values/api-endpoints.enum';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MockRundomRecipes } from 'app/__mock__/random-recipes';

type RandomRecipesResponce = { recipes: Recipe[] };

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
}
