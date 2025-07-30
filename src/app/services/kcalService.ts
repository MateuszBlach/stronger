import {Injectable} from '@angular/core';
import {Ingredient} from '../entity/ingredient';


@Injectable({
  providedIn: 'root'
})
export class KcalService {

  calculateKcal(ingredient: Ingredient, quantity: number) {
    return (ingredient.carbs * 4
          + ingredient.protein * 4
          + ingredient.fat * 9) * quantity/100;
  }
}
