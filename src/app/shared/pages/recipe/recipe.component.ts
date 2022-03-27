import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '@core/models/recipe.model';
import { RecipesService } from '@core/services/recipes.service';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  recipe: Recipe;

  @Input() id: number;

  constructor(
    private modalController: ModalController,
    private recipesService: RecipesService,
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.recipesService.getRecipe(this.id).subscribe((recipe) => {
        this.recipe = recipe;
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  closeModal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
