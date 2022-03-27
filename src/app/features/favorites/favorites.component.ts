import { AppRoutes } from '@core/values/app-routes.enum';
import { RecipesService } from '@core/services/recipes.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '@core/models/recipe.model';
import { FavoritesStorageService } from '@core/services/favorites-storage.service';
import { Subscription, Observable } from 'rxjs';
import { ModalService } from '@core/services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  favorites$: Array<Observable<Recipe>>;

  favorites: Array<number>;

  constructor(
    private favoritesStorageService: FavoritesStorageService,
    private recipesService: RecipesService,
    private modalService: ModalService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.favoritesStorageService.getFavorites().subscribe((favorites) => {
        this.favorites = favorites;
        this.favorites$ = favorites.map((id) => this.getRecipe(id));
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private getRecipe(id: number): Observable<Recipe> {
    return this.recipesService.getRecipe(id);
  }

  openModal(id: number) {
    this.modalService.openRecipeModal(id);
  }

  navigateToSearchPage() {
    this.router.navigate([AppRoutes.SEARCH]);
  }
}
