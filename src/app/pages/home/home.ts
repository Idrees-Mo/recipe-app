import { Component, inject, OnInit, signal } from '@angular/core';
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
  query = signal('');
  recipes = signal<Recipe[]>([]);
  filtered = signal<Recipe[]>([]);
  loading = signal(false);

  constructor(private recipeService: RecipeService) {}

  // filter locally (when typing)
  onQueryChange(value: string) {
    this.query.set(value);

    if (!value) {
      this.filtered.set(this.recipes());
      return;
    }
    if (!this.recipes().length) {
      return;
    }
    const q = value.toLowerCase();
    this.filtered.set(
      this.recipes().filter(
        (r) => r.title.toLowerCase().includes(q) || r.instructions?.toLowerCase().includes(q)
      )
    );
  }

  // fetch fresh recipes (when clicking Search)
  onSearchSubmit() {
    this.loading.set(true);
    console.warn('Searching for', this.query());
    this.recipeService.searchMeals(this.query()).subscribe({
      next: (meals) => {
        this.recipes.set(meals);
        this.filtered.set(meals); // reset filter after fetch
        this.loading.set(false);
        this.query.set('');
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }
}
