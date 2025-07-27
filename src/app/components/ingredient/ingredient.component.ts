import {Component, WritableSignal} from '@angular/core';
import {Ingredient} from '../../entity/ingredient';
import {IngredientsService} from '../../services/ingredients.service';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class IngredientComponent {

  ingredients: WritableSignal<Ingredient[]>;
  ingredient: Ingredient = {
    id: 100,
    name: '',
    protein: 0,
    carbs: 0,
    fat: 0,
  };


  constructor(private ingredientsService: IngredientsService) {
    this.ingredients = ingredientsService.getIngredients();
  }

  async createIngredient() {
    await this.ingredientsService.addIngredient(this.ingredient);
  }

  deleteIngredient(id: number) {
    this.ingredientsService.deleteIngredient(id.toString());
  }

  calculateKcal(ingredient: Ingredient): number {
    return ingredient.protein * 4 + ingredient.carbs * 4 + ingredient.fat *9;
  }

}
