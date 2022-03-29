import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '@core/models/recipe.model';
import { FavoritesStorageService } from '@core/services/favorites-storage.service';
import { RecipesService } from '@core/services/recipes.service';
import { ModalController } from '@ionic/angular';
import { Subject, Subscription } from 'rxjs';
import { switchMap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  private readonly toggleFavoritesStatus$ = new Subject<boolean>();

  private readonly checkFavoriteStatus$ = new Subject<number>();

  isFavorite = false;

  recipe: Recipe;

  @Input() id: number;

  constructor(
    private modalController: ModalController,
    private recipesService: RecipesService,
    private favoritesStorageService: FavoritesStorageService,
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.recipesService.getRecipe(this.id).subscribe((recipe) => {
        this.recipe = recipe;
      }),
    );

    this.subscriptions.add(
      this.favoritesStorageService
        .isFavorite(this.recipe.id)
        .subscribe(this.setFavoriteStatus),
    );

    this.subscriptions.add(
      this.toggleFavoritesStatus$
        .pipe(
          debounceTime(500),
          switchMap((status) =>
            this.favoritesStorageService.toggleStatus(this.recipe.id, status),
          ),
        )
        .subscribe(() => {
          this.checkFavoriteStatus$.next(this.recipe.id);
        }),
    );

    this.subscriptions.add(
      this.checkFavoriteStatus$
        .pipe(
          switchMap((id: number) =>
            this.favoritesStorageService.isFavorite(id),
          ),
        )
        .subscribe(this.setFavoriteStatus),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private setFavoriteStatus = (status: boolean) => {
    this.isFavorite = status;
    console.log('isFavorite', this.isFavorite)
  };

  closeModal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  onToggleFavoritesStatus() {
    this.toggleFavoritesStatus$.next(!this.isFavorite);
  }
}
