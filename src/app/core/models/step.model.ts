import { Ingredient } from "./ingredient.model";

export interface Step {
  number: number;
  step: string;
  ingredients: Ingredient[];
  equipment: Ingredient[];
  length?: {
    number: number;
    unit: string;
  };
}
