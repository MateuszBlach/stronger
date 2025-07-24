import {Injectable, signal, WritableSignal} from '@angular/core';
import {DatabaseService, User} from './database.service';
import {SQLiteDBConnection} from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private db!: SQLiteDBConnection;
  private users: WritableSignal<User[]> = signal<User[]>([]);

  constructor(private databaseService: DatabaseService) {}

  async init() {
    this.db = this.databaseService.getDB();
    await this.loadUsers();
  }

  getUsers(): WritableSignal<User[]> {
    return this.users;
  }

  async loadUsers() {
    const users = await this.db.query('SELECT * FROM users');
    this.users.set(users.values || []);
  }

  async addUser(name: string) {
    const query = `INSERT INTO users (name) VALUES ('${name}')`;
    const result = await  this.db.query(query);

    this.loadUsers();
    return result;
  }

  async updateUserById(id: string, active: number) {
    const query = `UPDATE users SET active = ${active} WHERE id = ${id}`;
    const result = await  this.db.query(query);

    this.loadUsers();

    return result;
  }

  async deleteUser(id: string) {
    const query = `DELETE FROM users WHERE id = ${id}`;
    const result = await  this.db.query(query);

    this.loadUsers();

    return result;
  }

}
