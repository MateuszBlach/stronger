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

    await this.db.execute(ingredientsSchema);
    return this.db;
  }

  getDB(): SQLiteDBConnection {
    if (!this.db) throw new Error('Database not initialized');
    return this.db;
  }




}
