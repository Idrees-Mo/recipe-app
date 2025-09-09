import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../../core/models/recipe';
import { mockRecipes } from '../../core/mocks/recipe.mock';
import { RecipeCard } from '../../shared/components/recipe-card/recipe-card';
import { NgFor } from '@angular/common';
import { RecipeService } from '../../core/services/recipe.service';

@Component({
  selector: 'app-home',
  imports: [RecipeCard, NgFor, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  query = '';
  recipes: Recipe[] = [];
  loading = false;

  constructor(private recipeSvc: RecipeService) {}
  ngOnInit() {
    this.recipes = mockRecipes;
  }

  onSearch() {
    this.loading = true;
    this.recipeSvc.searchMeals(this.query).subscribe((list) => {
      this.recipes = list;
      this.loading = false;
    });
  }
}
