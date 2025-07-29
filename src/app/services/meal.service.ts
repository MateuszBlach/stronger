import {Injectable, signal, WritableSignal} from '@angular/core';
import {SQLiteDBConnection} from '@capacitor-community/sqlite';
import {DatabaseService} from './database.service';
import {Meal} from '../entity/meal';
import {Ingredient} from '../entity/ingredient';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private db!: SQLiteDBConnection;
  private meals: WritableSignal<Meal[]> = signal<Meal[]>([]);

  constructor(private databaseService: DatabaseService) {}

  async init() {
    this.db = this.databaseService.getDB();
    await this.loadMeals();
  }

  getMeals(): WritableSignal<Meal[]> {
    return this.meals;
  }

  async loadMeals() {
    const meals = await this.db.query('SELECT * FROM meals');
    this.meals.set(meals.values || []);
  }

  async addMeal(name: string) {
    const query = `INSERT INTO meals (name) VALUES (?)`;
    const values = [name];

    const result = await this.db.query(query, values);

    this.loadMeals();
    return result;
  }


  async deleteMeal(id: string) {
    const query = `DELETE FROM meals WHERE id = ${id}`;
    const result = await this.db.query(query);

    this.loadMeals();
    return result
  }

}
