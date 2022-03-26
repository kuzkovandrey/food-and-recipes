import { RecipesService } from '@core/services/recipes.service';
import { AppRoutes } from '@core/values/app-routes.enum';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  constructor(private router: Router, private recipesService: RecipesService) {}

  ngOnInit() {
    this.subscriptions.add(
      // this.recipesService.getRandomRecipes().subscribe((r) => {
      //   console.log(r);
      // }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  navigateToAuth() {
    this.router.navigate([AppRoutes.AUTH]);
  }
}
