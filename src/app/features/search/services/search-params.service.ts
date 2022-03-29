import { Injectable } from '@angular/core';
import { QueryParams } from '@core/values/query-params.enum';
import { BehaviorSubject } from 'rxjs';
import { SearchParamType } from '../types/search-param.type';

@Injectable()
export class SearchParamsService {
  private readonly default: SearchParamType = {
    [QueryParams.TYPE]: '',
    [QueryParams.CUISUNE]: '',
    [QueryParams.DIET]: '',
  };

  private readonly params = new BehaviorSubject<SearchParamType>(
    this.default
  );

  get defaultParams(): SearchParamType {
    return {...this.default };
  }

  setParams(params: SearchParamType) {
    this.params.next(params);
  }

  getParams(): SearchParamType {
    return this.params.value;
  }

  resetParams() {
    this.params.next(this.default);
  }
}
