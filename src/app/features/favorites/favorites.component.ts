import { HttpErrorMessages } from '@core/values/http-error-messages.enum';
import { LoadingService } from '@core/services/loading.service';
import { AppRoutes } from '@core/values/app-routes.enum';
import { RecipesService } from '@core/services/recipes.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '@core/models/recipe.model';
import { FavoritesStorageService } from '@core/services/favorites-storage.service';
import { Subscription, Observable, Subject, forkJoin } from 'rxjs';
import { ModalService } from '@core/services/modal.service';
import { Router } from '@angular/router';
import { delay, switchMap, debounceTime, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  private favoritesObservablesArray: Array<Observable<Recipe>>;

  private favorites$ = new Subject<Array<Observable<Recipe>>>();

  get isShowFavorites(): boolean {
    return this.favorites && !!this.favorites.length;
  }

  get isShowNotFoundView(): boolean {
    return (!this.favorites|| !this.favorites.length) && !this.isLoading;
  }

  favorites: Array<Recipe>;

  isLoading = true;

  constructor(
    private favoritesStorageService: FavoritesStorageService,
    private recipesService: RecipesService,
    private modalService: ModalService,
    private router: Router,
    private loadingService: LoadingService,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.favoritesStorageService.getFavorites().subscribe((favorites) => {
        if (!favorites.length) {
          this.isLoading = false;
          return;
        }

        this.showLoader();

        this.favoritesObservablesArray = favorites.map((id) => this.getRecipe(id));

        this.favorites$.next(this.favoritesObservablesArray);
      }),
    );

    this.subscriptions.add(
      this.favorites$.pipe(
        // delay(2000),
        debounceTime(1),
        switchMap((array) => forkJoin(array)),
        tap(() => this.hideLoader()),
      ).subscribe(this.setFavoritesRecipes, this.handleError)
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private showLoader() {
    this.loadingService.show();
  }

  private hideLoader() {
    this.loadingService.hide();
    this.isLoading = false;
  }

  private getRecipe(id: number): Observable<Recipe> {
    return this.recipesService.getRecipe(id);
  }

  private handleError = (error: HttpErrorResponse) => {
    this.toastService.show(HttpErrorMessages.DEFAULT);
  };

  private setFavoritesRecipes = (favorites: Recipe[]) => {
    this.favorites = favorites;
  };

  openModal(id: number) {
    this.modalService.openRecipeModal(id);
  }

  navigateToSearchPage() {
    this.router.navigate([AppRoutes.SEARCH]);
  }
}
