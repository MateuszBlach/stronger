import {Component, WritableSignal} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {MealService} from '../../services/meal.service';
import {Meal} from '../../entity/meal';
import {Ingredient} from '../../entity/ingredient';
import {IngredientsService} from '../../services/ingredients.service';
import {MealIngredient} from '../../entity/mealIngredient';
import {MealIngredientService} from '../../services/mealIngredient.service';
import {KcalService} from '../../services/kcalService';

@Component({
  selector: 'app-meal',
  imports: [IonicModule, FormsModule],
  templateUrl: './meal.component.html',
  standalone: true
})
export class MealComponent {

  newMealName = ''


  selectedMeal: number = -1;

  meals: WritableSignal<Meal[]>;
  ingredients: WritableSignal<Ingredient[]>;
  selectedIngredients: Ingredient[] = [];
  mealIngredients: MealIngredient[] = [];


  constructor(
    private mealService: MealService,
    private ingredientService: IngredientsService,
    private mealsIngredientsService: MealIngredientService,
    protected kcalService: KcalService,
  ) {
    this.meals = mealService.getMeals();
    this.ingredients = ingredientService.getIngredients();
  }

  addMealIngredients() {
    for (const mealIngredient of this.mealIngredients) {
      this.mealsIngredientsService.addMealIngredient({
        mealId: this.selectedMeal,
        ingredientId: mealIngredient.id,
        quantity: mealIngredient.quantity,
      })
    }
  }


  addNewMeal() {
    this.mealService.addMeal(this.newMealName);
    this.newMealName = '';
  }

  deleteMeal(id: number) {
    this.mealService.deleteMeal(id.toString());
  }

  onSelectedIngredientsChange() {
    this.mealIngredients = this.selectedIngredients.map(ingredient => {
      const existing = this.mealIngredients.find(mi => mi.ingredient.id === ingredient.id);
      return existing ?? {
        id: Date.now() + Math.random(),
        ingredient,
        quantity: 0
      };
    });
  }

  accordionGroupChange = (event: CustomEvent) => {
    console.log("=>(meal.component.ts:70) event.detail.value", event.detail.value);

    if(event.detail.value >= 1) {
      console.log("=>(meal.component.ts:75) EEOEOEO ");
      this.selectedMeal = event.detail.value;
    }


    //On Accordion Collapse
    if(event.detail.value === undefined) {
      this.selectedIngredients = [];
      this.mealIngredients = [];
    }

  };

}
