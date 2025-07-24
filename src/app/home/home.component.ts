import {Component, WritableSignal} from '@angular/core';
import { User} from '../services/database.service';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {UsersService} from '../services/users.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class AppHomeComponent {
  users:WritableSignal<User[]>;
  newUserName = '';

  constructor(private usersService: UsersService) {
    this.users = usersService.getUsers();
  }

  async createUser() {
    await this.usersService.addUser(this.newUserName);
    this.newUserName = '';
  }

  updateUser(user: User) {
    const active = user.active ? 1 : 0;
    this.usersService.updateUserById(user.id.toString(), active);
  }

  deleteUser(user: User) {
    this.usersService.deleteUser(user.id.toString());
  }

}
