import { QueryParams } from '@core/values/query-params.enum';

type SearchParamValues = {
  name: string;
  values: string[];
}

export const SearchParamsValues: SearchParamValues[] = [
  {
    name: QueryParams.CUISUNE,
    values: [
      'thai',
      'spanish',
      'italian',
      'german',
      'mexican',
      'european',
      'american',
      'british',
      'none',
    ],
  },
  {
    name: QueryParams.DIET,
    values: ['vegetarian', 'vegan', 'paleo', 'ketogenic','none'],
  },
  {
    name: QueryParams.TYPE,
    values: [
      'bread',
      'breakfast',
      'soup',
      'drink',
      'salad',
      'dessert',
      'appetizer',
      'none',
    ],
  },
];
