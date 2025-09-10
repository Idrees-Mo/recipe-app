import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { RecipeService } from './recipe.service';
import { Recipe } from '../models/recipe';

describe('RecipeService', () => {
  let service: RecipeService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  const mockMeal = {
    idMeal: '123',
    strMeal: 'Test Meal',
    strCategory: 'Test Category',
    strArea: 'Test Area',
    strInstructions: 'Test instructions',
    strMealThumb: 'test.jpg',
    strYoutube: 'https://youtube.com/test',
    strIngredient1: 'Ingredient 1',
    strIngredient2: 'Ingredient 2',
    strIngredient3: '',
    strIngredient4: null,
    strMeasure1: 'Measure 1',
    strMeasure2: 'Measure 2',
    strMeasure3: 'Measure 3',
    strMeasure4: null,
  };

  const mockMealsResponse = {
    meals: [mockMeal, { ...mockMeal, idMeal: '456', strMeal: 'Test Meal 2' }],
  };

  const mockEmptyMealsResponse = {
    meals: null,
  };

  const expectedRecipe: Recipe = {
    id: '123',
    title: 'Test Meal',
    category: 'Test Category',
    area: 'Test Area',
    instructions: 'Test instructions',
    thumbnail: 'test.jpg',
    youtube: 'https://youtube.com/test',
    ingredients: [
      { ingredient: 'Ingredient 1', measure: 'Measure 1' },
      { ingredient: 'Ingredient 2', measure: 'Measure 2' },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RecipeService],
    });

    service = TestBed.inject(RecipeService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('searchMeals', () => {
    it('should return empty array for empty query', (done) => {
      service.searchMeals('').subscribe((result) => {
        expect(result).toEqual([]);
        done();
      });
    });

    it('should make HTTP GET request with encoded query', (done) => {
      const testQuery = 'test query';
      service.searchMeals(testQuery).subscribe(() => {
        done();
      });

      const req = httpMock.expectOne(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(testQuery)}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockMealsResponse);
    });

    it('should return mapped recipes on successful response', (done) => {
      service.searchMeals('test').subscribe((result) => {
        expect(result.length).toBe(2);
        expect(result[0]).toEqual(expectedRecipe);
        expect(result[1].id).toBe('456');
        done();
      });

      const req = httpMock.expectOne('https://www.themealdb.com/api/json/v1/1/search.php?s=test');
      req.flush(mockMealsResponse);
    });

    it('should return empty array when meals is null', (done) => {
      service.searchMeals('test').subscribe((result) => {
        expect(result).toEqual([]);
        done();
      });

      const req = httpMock.expectOne('https://www.themealdb.com/api/json/v1/1/search.php?s=test');
      req.flush(mockEmptyMealsResponse);
    });
  });

  describe('getMealById', () => {
    it('should return null for empty id', (done) => {
      service.getMealById('').subscribe((result) => {
        expect(result).toBeNull();
        done();
      });
    });

    it('should return mapped recipe on successful response', (done) => {
      service.getMealById('123').subscribe((result) => {
        expect(result).toEqual(expectedRecipe);
        done();
      });

      const req = httpMock.expectOne('https://www.themealdb.com/api/json/v1/1/lookup.php?i=123');
      req.flush({ meals: [mockMeal] });
    });
  });

  describe('mapMealToRecipe', () => {
    it('should correctly map meal to recipe', () => {
      const result = (service as any).mapMealToRecipe(mockMeal);
      expect(result).toEqual(expectedRecipe);
    });

    it('should handle empty ingredients and measures', () => {
      const mealWithEmptyIngredients = {
        ...mockMeal,
        strIngredient1: '',
        strIngredient2: null,
        strMeasure1: '',
        strMeasure2: null,
      };

      const result = (service as any).mapMealToRecipe(mealWithEmptyIngredients);
      expect(result.ingredients).toEqual([]);
    });
  });
});
