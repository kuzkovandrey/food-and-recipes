import { ShortRecipe } from '@core/models/short-recipe.model';

export type SearchRecipesResponce = {
  offset: number;
  number: number;
  totalResults: number;
  results: ShortRecipe[];
};
