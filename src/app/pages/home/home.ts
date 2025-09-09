import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../core/models/recipe';
import { mockRecipes } from '../../core/mocks/recipe.mock';
import { RecipeCard } from '../../shared/components/recipe-card/recipe-card';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RecipeCard, NgFor],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  recipes: Recipe[] = [];
  loading = false;

  constructor() {}
  ngOnInit() {
    this.recipes = mockRecipes;
  }
}
