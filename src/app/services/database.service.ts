import {Injectable} from '@angular/core';
import {CapacitorSQLite, SQLiteConnection, SQLiteDBConnection} from '@capacitor-community/sqlite';

const DB_USERS = 'myuserdb'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private sqLite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;

  async initializePlugin() {
    this.db = await this.sqLite.createConnection(
      DB_USERS,
      false,
      'no-encryption',
      1,
      false
    )

    await this.db.open();


    const ingredientsSchema = `CREATE TABLE IF NOT EXISTS ingredients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    protein REAL NOT NULL,
    carbs REAL NOT NULL,
    fat REAL NOT NULL
  );`;

    const mealsSchema = `CREATE TABLE IF NOT EXISTS meals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);`;

    const mealIngredientsSchema = `CREATE TABLE IF NOT EXISTS meal_ingredients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    meal_id INTEGER,
    ingredient_id INTEGER,
    quantity REAL NOT NULL,
    FOREIGN KEY (meal_id) REFERENCES meals(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE
);`;


    await this.db.execute(ingredientsSchema);
    await this.db.execute(mealsSchema);
    await this.db.execute(mealIngredientsSchema);

    return this.db;
  }

  getDB(): SQLiteDBConnection {
    if (!this.db) throw new Error('Database not initialized');
    return this.db;
  }




}
