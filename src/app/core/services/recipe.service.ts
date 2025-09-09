import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly api = 'https://www.themealdb.com/api/json/v1/1';

  constructor(private http: HttpClient) {}

  searchMeals(query: string): Observable<Recipe[]> {
    if (!query?.trim()) return of<Recipe[]>([]);
    return this.http
      .get<{ meals: any[] | null }>(`${this.api}/search.php?s=${encodeURIComponent(query)}`)
      .pipe(
        map((res: { meals: any[] | null }) =>
          res.meals ? res.meals.map((m) => this.mapMealToRecipe(m)) : []
        ),
        catchError(() => of([]))
      );
  }

  getMealById(id: string): Observable<Recipe | null> {
    if (!id) return of(null);
    return this.http
      .get<{ meals: any[] | null }>(`${this.api}/lookup.php?i=${encodeURIComponent(id)}`)
      .pipe(
        map((res) => (res.meals && res.meals[0] ? this.mapMealToRecipe(res.meals[0]) : null)),
        catchError(() => of(null))
      );
  }

  private mapMealToRecipe(meal: any): Recipe {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ing && ing.trim()) {
        ingredients.push({ ingredient: ing.trim(), measure: (measure || '').trim() });
      }
    }
    return {
      id: meal.idMeal,
      title: meal.strMeal,
      category: meal.strCategory,
      area: meal.strArea,
      instructions: meal.strInstructions,
      thumbnail: meal.strMealThumb,
      youtube: meal.strYoutube,
      ingredients,
    };
  }
}
