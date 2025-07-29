import {Component, WritableSignal} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {MealService} from '../../services/meal.service';
import {Meal} from '../../entity/meal';

@Component({
  selector: 'app-meal',
  imports: [IonicModule, FormsModule],
  templateUrl: './meal.component.html',
  standalone: true
})
export class MealComponent {

  newMealName = ''

  meals: WritableSignal<Meal[]>;

  constructor(
    private mealService: MealService,
  ) {
    this.meals = mealService.getMeals();
  }


  addNewMeal() {
    this.mealService.addMeal(this.newMealName);
    this.newMealName = '';
  }

  deleteMeal(id: number) {
    this.mealService.deleteMeal(id.toString());
  }
}
