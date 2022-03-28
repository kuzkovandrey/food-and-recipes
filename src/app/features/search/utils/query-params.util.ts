import { SearchParamType } from '../types/search-param.type';

export class QueryParamsUtil {
  public static removeEmpty(params: SearchParamType): SearchParamType {
    return Object.fromEntries(
      Object.entries(params).filter(([key, value]) => !!value),
    );
  }
}
