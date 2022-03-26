import { AuthService } from '@features/auth/services/auth.service';
import { RecipesService } from '@core/services/recipes.service';
import { AppRoutes } from '@core/values/app-routes.enum';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Recipe } from '@core/models/recipe.model';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  isAuthorized$: Observable<boolean>;

  recipes$: Observable<Recipe[]>;

  constructor(
    private router: Router,
    private recipesService: RecipesService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.isAuthorized$ = this.authService.isAuthorized$;

    this.recipes$ = this.recipesService.getRandomRecipes();

    // this.subscriptions.add(
    //   this.recipesService.getRandomRecipes().subscribe((r) => {
    //     console.log(r);
    //   }),
    // );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  navigateToAuth() {
    this.router.navigate([AppRoutes.AUTH]);
  }
}
