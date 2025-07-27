import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DatabaseService} from './services/database.service';
import {SplashScreen} from '@capacitor/splash-screen';
import {IngredientsService} from './services/ingredients.service';
import {IngredientComponent} from './components/ingredient/ingredient.component';
import {IonicModule} from '@ionic/angular';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, IngredientComponent, IonicModule],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
