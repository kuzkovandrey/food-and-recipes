import { QueryParams } from '@core/values/query-params.enum';

type SearchParamValues = {
  name: string;
  values: string[];
}

export const SearchParamsValues: SearchParamValues[] = [
  {
    name: QueryParams.CUISUNE,
    values: [
      'Thai',
      'Spanish',
      'Italian',
      'German',
      'Mexican',
      'European',
      'American',
      'British',
      'None',
    ],
  },
  {
    name: QueryParams.DIET,
    values: ['Vegetarian', 'Vegan', 'Paleo', 'Ketogenic','None'],
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
      'None',
    ],
  },
];
