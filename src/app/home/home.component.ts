import {Component, WritableSignal} from '@angular/core';
import {DatabaseService, User} from '../services/database.service';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class AppHomeComponent {
  users:WritableSignal<User[]>;
  newUserName = '';

  constructor(private database: DatabaseService) {
    this.users = database.getUsers();
  }

  async createUser() {
    await this.database.addUser(this.newUserName);
    this.newUserName = '';
  }

  updateUser(user: User) {
    const active = user.active ? 1 : 0;
    this.database.updateUserById(user.id.toString(), active);
  }

  deleteUser(user: User) {
    this.database.deleteUser(user.id.toString());
  }

}
