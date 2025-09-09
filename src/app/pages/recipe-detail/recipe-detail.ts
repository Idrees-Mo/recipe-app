import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Recipe } from '../../core/models/recipe';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../core/services/recipe.service';
import { LoadingSpinner } from '../../shared/components/loading-spiner/loading-spiner';

@Component({
  selector: 'app-recipe-detail',
  imports: [LoadingSpinner],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss',
})
export class RecipeDetail implements OnInit {
  meal: Recipe | null = null;
  loading = true;

  // private recipeSvc = inject(RecipeService);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  constructor(private recipeSvc: RecipeService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.recipeSvc.getMealById(id).subscribe((m) => {
      this.meal = m;
      this.loading = false;
    });
  }

  goBack() {
    this.location.back();
  }
}
