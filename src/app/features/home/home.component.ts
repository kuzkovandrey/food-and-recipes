import { FoodCardComponent } from '@shared/components/food-card/food-card.component';
import { AuthService } from '@features/auth/services/auth.service';
import { RecipesService } from '@core/services/recipes.service';
import { AppRoutes } from '@core/values/app-routes.enum';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable, Subject } from 'rxjs';
import { Recipe } from '@core/models/recipe.model';
import { ModalService } from '@core/services/modal.service';
import { ViewDidEnter } from '@ionic/angular';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { LoadingService } from '@core/services/loading.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy, ViewDidEnter {
  private readonly subscriptions = new Subscription();

  private readonly getRandomRecipes$ = new Subject<void>();

  private isAuthorized = false;

  // TODO: Remote after add endpoint
  @ViewChildren(FoodCardComponent) private cards: QueryList<FoodCardComponent>;

  isAuthorized$: Observable<boolean>;

  recipes$: Observable<Recipe[]>;

  recipes: Recipe[];

  isLoading = true;

  constructor(
    private router: Router,
    private recipesService: RecipesService,
    private authService: AuthService,
    private modalService: ModalService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit() {
    this.isAuthorized$ = this.authService.isAuthorized$;

    this.subscriptions.add(
      this.getRandomRecipes$
        .pipe(
          tap(this.showLoader),
          switchMap(() => this.recipesService.getRandomRecipes()),
          debounceTime(1),
          tap(this.hideLoader),
        )
        .subscribe(this.setRecipes),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  ionViewDidEnter() {
    // TODO: Remote after add endpoint
    if (this.cards)
      this.cards.toArray().forEach((card) => card.checkFavoriteStatus());

    if (this.authService.isAuthorized) this.getRandomRecipes$.next();
  }

  private showLoader = () => {
    this.loadingService.show();
  };

  private hideLoader = () => {
    this.loadingService.hide();
    this.isLoading = false;
  };

  private setRecipes = (recipes: Recipe[]) => {
    this.recipes = recipes;
  };

  navigateToAuth() {
    this.router.navigate([AppRoutes.AUTH]);
  }

  openModal(id: number) {
    this.modalService.openRecipeModal(id);
  }


}
