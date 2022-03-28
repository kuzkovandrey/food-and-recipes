import { ModalService } from '@core/services/modal.service';
import { SearchService } from '@core/services/search.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IonSearchbar, ViewWillEnter } from '@ionic/angular';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter, debounceTime, switchMap } from 'rxjs/operators';
import { SearchParamsService } from './services/search-params.service';
import { ShortRecipe } from '@core/models/short-recipe.model';
import { RecipeComponent } from '@shared/pages/recipe/recipe.component';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy, ViewWillEnter {
  private readonly search$ = new Subject<string>();

  private readonly subscriptions = new Subscription();

  @ViewChild(IonSearchbar) private searchBar: IonSearchbar;

  searchResult: ShortRecipe[];

  constructor(
    private searchParamsService: SearchParamsService,
    private searchService: SearchService,
    private modalService: ModalService,
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.search$
        .pipe(
          filter((text) => !!text),
          debounceTime(1000),
          switchMap(this.searchRecipes),
        )
        .subscribe((result) => {
          this.searchResult = result;
          console.log(this.searchResult)
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  ionViewWillEnter() {
    this.searchParamsService.resetParams();
  }

  private searchRecipes = (text: string): Observable<ShortRecipe[]> => {
    return this.searchService.search(text, this.searchParamsService.getParams());
  }

  onClickSearch() {
    this.search$.next(this.searchBar.value);
  }

  openRecipeModal(id: number) {
    this.modalService.open(RecipeComponent, { id });
  }
}
