import { Recipe } from './../models/recipe.model';
import { RecipesApi } from '@core/api/recipes.api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RecipesService {
  constructor(private recipesApi: RecipesApi) {}

  getRandomRecipes(count: number = 3): Observable<Recipe[]> {
    return this.recipesApi
      .getRandomRecipes(count)
      .pipe(map((response) => response.recipes));
  }
}
