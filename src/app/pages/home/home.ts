import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RecipeService } from '../../core/services/recipe.service';
import { Recipe } from '../../core/models/recipe';
import { Results } from '../results/results';
import { LoadingSpinner } from '../../shared/components/loading-spiner/loading-spiner';

@Component({
  selector: 'app-home',
  imports: [Results, LoadingSpinner, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  query = '';
  recipes: Recipe[] = [];
  loading = false;

  private recipeSvc = inject(RecipeService);

  constructor() {}

  onSearch() {
    this.loading = true;
    this.recipeSvc.searchMeals(this.query).subscribe((list) => {
      this.recipes = list;
      this.loading = false;
      this.query = '';
    });
  }
}
