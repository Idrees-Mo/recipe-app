import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RecipeService } from '../../core/services/recipe.service';
import { Recipe } from '../../core/models/recipe';
import { Results } from '../results/results';

@Component({
  selector: 'app-home',
  imports: [Results, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  query = '';
  recipes: Recipe[] = [];
  loading = false;

  constructor(private recipeSvc: RecipeService) {}

  onSearch() {
    this.loading = true;
    this.recipeSvc.searchMeals(this.query).subscribe((list) => {
      this.recipes = list;
      this.loading = false;
    });
  }
}
