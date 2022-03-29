import { QueryParams } from '@core/values/query-params.enum';
import { Component, OnInit } from '@angular/core';
import { SearchParamsValues } from '@features/search/values/search-params-values.const';
import { SearchParamsService } from '@features/search/services/search-params.service';
import { SearchParamType } from '@features/search/types/search-param.type';
import { QueryParamsUtil } from '@features/search/utils/query-params.util';

type ParamName = QueryParams.TYPE | QueryParams.CUISUNE | QueryParams.DIET;

@Component({
  selector: 'params-list',
  templateUrl: './params-list.component.html',
  styleUrls: ['./params-list.component.scss'],
})
export class ParamsListComponent implements OnInit {
  private params: SearchParamType;

  searchParams = SearchParamsValues;

  isVisibleParams = false;

  constructor(private searchParamsService: SearchParamsService) {}

  ngOnInit() {
    this.params = this.searchParamsService.defaultParams;
  }

  onChangeSelect(event: CustomEvent, paramName: ParamName) {
    this.params[paramName] = event.detail.value;

    this.searchParamsService.setParams(this.params);
  }

  toggleVisibilityParams() {
    this.isVisibleParams = !this.isVisibleParams;
  }
}
