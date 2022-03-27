import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FavoritesStorageService } from '@core/services/favorites-storage.service';
import { Recipe } from '@core/models/recipe.model';

@Component({
  selector: 'food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodCardComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  private readonly checkFavoriteStatus$ = new Subject<number>();

  private readonly toggleFavoritesStatus$ = new Subject<boolean>();

  @Input() recipe: Recipe;

  @Output() readMoreClicked = new EventEmitter<number>();

  isFavorite = false;

  constructor(
    private favoritesStorageService: FavoritesStorageService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.favoritesStorageService
        .isFavorite(this.recipe.id)
        .subscribe(this.setFavoriteStatus),
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

    this.subscriptions.add(
      this.toggleFavoritesStatus$
        .pipe(
          switchMap((status) =>
            this.favoritesStorageService.toggleStatus(this.recipe.id, status),
          ),
        )
        .subscribe(() => {
          this.checkFavoriteStatus$.next(this.recipe.id);
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private setFavoriteStatus = (status: boolean) => {
    this.isFavorite = status;
    this.changeDetectorRef.markForCheck();
  };

  onClickReadMore() {
    this.readMoreClicked.emit(this.recipe.id);
  }

  onToggleFavoritesStatus() {
    this.toggleFavoritesStatus$.next(!this.isFavorite);
  }

  checkFavoriteStatus() {
    this.checkFavoriteStatus$.next();
  }
}
