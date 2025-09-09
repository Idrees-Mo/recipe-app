import { Component, Input } from '@angular/core';
import { Recipe } from '../../../core/models/recipe';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-recipe-card',
  imports: [RouterLink, SlicePipe],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss',
})
export class RecipeCard {
  @Input({ required: true }) recipe!: Recipe;
  constructor() {}
}
