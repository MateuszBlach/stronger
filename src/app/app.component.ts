import {Component} from '@angular/core';
import {DatabaseService} from './services/database.service';
import {SplashScreen} from '@capacitor/splash-screen';
import {IngredientsService} from './services/ingredients.service';
import {IonApp, IonRouterOutlet} from '@ionic/angular/standalone';


@Component({
  selector: 'app-root',
  imports: [IonRouterOutlet, IonApp],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss',
  schemas: []
})
export class AppComponent {

  constructor(
    private database: DatabaseService,
    private ingredientsService: IngredientsService
  ) {
    this.initApp();
  }

  async initApp() {
    await this.database.initializePlugin();
    await this.ingredientsService.init();
    SplashScreen.hide();
  }

}
