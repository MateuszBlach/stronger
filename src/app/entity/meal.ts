import {MealIngredient} from './mealIngredient';

export  interface Meal {
  id: number;
  name: string;
  mealIngredients: MealIngredient[];
}
