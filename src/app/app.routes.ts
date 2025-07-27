import { Routes } from '@angular/router';
import {TabsComponent} from './components/tabs/tabs.component';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      {
        path: 'ingredient',
        loadComponent: () => import('./components/ingredient/ingredient.component').then(m => m.IngredientComponent)
      },
      {
        path: 'meal',
        loadComponent: () => import('./components/meal/meal.component').then(m => m.MealComponent)
      },
      {
        path: '',
        redirectTo: 'ingredient',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/ingredient',
    pathMatch: 'full'
  }
];

