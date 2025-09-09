import { Component, Input } from '@angular/core';
import { RecipeCard } from '../../shared/components/recipe-card/recipe-card';
import { Recipe } from '../../core/models/recipe';

@Component({
  selector: 'app-results',
  imports: [RecipeCard],
  templateUrl: './results.html',
  styleUrl: './results.scss',
})
export class Results {
  @Input() recipes: Recipe[] = [];
}
