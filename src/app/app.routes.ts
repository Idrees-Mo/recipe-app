import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
// import { Results } from './pages/results/results';
import { RecipeDetail } from './pages/recipe-detail/recipe-detail';

export const routes: Routes = [
  { path: '', component: Home },
  //   { path: 'results', component: Results },
  { path: 'recipe/:id', component: RecipeDetail },
  { path: '**', redirectTo: '' },
];
