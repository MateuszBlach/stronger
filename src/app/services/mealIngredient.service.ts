import {Injectable, signal, WritableSignal} from '@angular/core';
import {SQLiteDBConnection} from '@capacitor-community/sqlite';
import {Meal} from '../entity/meal';
import {DatabaseService} from './database.service';
import {MealIngredient} from '../entity/mealIngredient';
import {AddMealIngredientDto} from '../entity/dto/AddMealIngredientDto';


@Injectable({
  providedIn: 'root'
})
export class MealIngredientService {

  private db!: SQLiteDBConnection;
  private mealIngredients: WritableSignal<MealIngredient[]> = signal<MealIngredient[]>([]);

  constructor(private databaseService: DatabaseService) {}

  async init() {
    this.db = this.databaseService.getDB();
    await this.loadMealIngredients();
  }

  getMealIngredients(): WritableSignal<MealIngredient[]> {
    return this.mealIngredients;
  }

  async loadMealIngredients() {
    const mealIngredients = await this.db.query('SELECT * FROM meal_ingredients');
    this.mealIngredients.set(mealIngredients.values || []);
  }

  async addMealIngredient(mealIngredient: AddMealIngredientDto) {
    const query = `INSERT INTO meal_ingredients (meal_id, ingredient_id, quantity) VALUES (?,?,?)`;
    const values = [mealIngredient.mealId,mealIngredient.ingredientId,mealIngredient.quantity];

    const result = await this.db.query(query, values);

    this.loadMealIngredients();
    return result;
  }


  async deleteMealIngredient(id: string) {
    const query = `DELETE FROM meal_ingredients WHERE id = ${id}`;
    const result = await this.db.query(query);

    this.loadMealIngredients();
    return result
  }

}
