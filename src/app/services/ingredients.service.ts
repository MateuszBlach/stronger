import {Injectable, signal, WritableSignal} from '@angular/core';
import {SQLiteDBConnection} from '@capacitor-community/sqlite';
import {Ingredient} from '../entity/ingredient';
import {DatabaseService} from './database.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  private db!: SQLiteDBConnection;
  private ingredients: WritableSignal<Ingredient[]> = signal<Ingredient[]>([]);

  constructor(private databaseService: DatabaseService) {}

  async init() {
    this.db = this.databaseService.getDB();
    await this.loadIngredients();
  }

  getIngredients(): WritableSignal<Ingredient[]> {
    return this.ingredients;
  }

  async loadIngredients() {
    const ingredients = await this.db.query('SELECT * FROM ingredients');
    this.ingredients.set(ingredients.values || []);
  }

  async addIngredient(ingredient: Ingredient) {
    const query = `INSERT INTO ingredients (name, protein, carbs, fat) VALUES (?, ?, ?, ?)`;
    const values = [ingredient.name, ingredient.protein, ingredient.carbs, ingredient.fat];

    const result = await this.db.query(query, values);

    this.loadIngredients();
    return result;
  }


  async deleteIngredient(id: string) {
    const query = `DELETE FROM ingredients WHERE id = ${id}`;
    const result = await this.db.query(query);

    this.loadIngredients();
    return result
  }
}
