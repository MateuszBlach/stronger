import {DailyMeal} from './dailyMeal';

export interface EatingDay {
  id: number,
  date: string,
  dailyMeals: DailyMeal[]
}
