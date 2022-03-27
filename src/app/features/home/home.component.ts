import { FoodCardComponent } from './../../shared/components/food-card/food-card.component';
import { AuthService } from '@features/auth/services/auth.service';
import { RecipesService } from '@core/services/recipes.service';
import { AppRoutes } from '@core/values/app-routes.enum';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Recipe } from '@core/models/recipe.model';
import { ModalService } from '@core/services/modal.service';
import { ViewWillEnter, ViewDidEnter } from '@ionic/angular';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy, ViewDidEnter {
  private readonly subscriptions = new Subscription();

  private isAuthorized = false;

  // TODO: Remote after add endpoint
  @ViewChildren(FoodCardComponent) private cards: QueryList<FoodCardComponent>;

  isAuthorized$: Observable<boolean>;

  recipes$: Observable<Recipe[]>;

  constructor(
    private router: Router,
    private recipesService: RecipesService,
    private authService: AuthService,
    private modalService: ModalService,
  ) {}

  ngOnInit() {
    this.isAuthorized$ = this.authService.isAuthorized$.pipe(
      tap((isAuthorized) => (this.isAuthorized = isAuthorized)),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  ionViewDidEnter() {
    if (this.isAuthorized) {
      this.recipes$ = this.recipesService.getRandomRecipes();
    }

    // TODO: Remote after add endpoint
    if (this.cards) {
      this.cards.toArray().forEach((card) => card.checkFavoriteStatus());
    }
  }

  navigateToAuth() {
    this.router.navigate([AppRoutes.AUTH]);
  }

  openModal(id: number) {
    this.modalService.openRecipeModal(id);
  }
}
