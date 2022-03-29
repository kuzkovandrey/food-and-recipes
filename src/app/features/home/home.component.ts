import { AuthService } from '@features/auth/services/auth.service';
import { RecipesService } from '@core/services/recipes.service';
import { AppRoutes } from '@core/values/app-routes.enum';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable, Subject } from 'rxjs';
import { Recipe } from '@core/models/recipe.model';
import { ModalService } from '@core/services/modal.service';
import { ViewDidEnter, ViewWillEnter } from '@ionic/angular';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { LoadingService } from '@core/services/loading.service';
import { RecipeComponent } from '@shared/pages/recipe/recipe.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy, ViewWillEnter {
  private readonly subscriptions = new Subscription();

  private readonly getRandomRecipes$ = new Subject<void>();

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

  ionViewWillEnter() {
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
    this.modalService.open(RecipeComponent, { id });
  }
}
