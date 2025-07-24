import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {DatabaseService} from './services/database.service';
import {SplashScreen} from '@capacitor/splash-screen';
import {AppHomeComponent} from './home/home.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, IonicModule, AppHomeComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(
    private database: DatabaseService,
  ) {
    this.initApp();
  }

  async initApp() {
    await this.database.initializePlugin()
    SplashScreen.hide();
  }

}
