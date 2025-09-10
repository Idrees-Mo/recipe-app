import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { Home } from './home';
import { RecipeService } from '../../core/services/recipe.service';
import { Results } from '../results/results';
import { LoadingSpinner } from '../../shared/components/loading-spiner/loading-spiner';
import { mockRecipes } from '../../core/mocks/recipe.mock';

// Mock RecipeService
class MockRecipeService {
  searchMeals = jasmine.createSpy('searchMeals').and.returnValue(of(mockRecipes));
}

describe('HomeComponent', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  // let recipeService: MockRecipeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home, FormsModule, Results, LoadingSpinner],
      providers: [{ provide: RecipeService, useClass: MockRecipeService }],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    // recipeService = TestBed.inject(RecipeService) as unknown as MockRecipeService;
  });

  it('should create the home component', () => {
    expect(component).toBeTruthy();
  });

  describe('onQueryChange', () => {
    beforeEach(() => {
      // Set some recipes for filtering tests
      component.recipes.set(mockRecipes);
      component.filteredRecipes.set(mockRecipes);
    });

    it('should update query signal', () => {
      const testQuery = 'test query';
      component.onQueryChange(testQuery);
      expect(component.query()).toBe(testQuery);
    });

    it('should reset filteredRecipes to all recipes when query is empty', () => {
      component.onQueryChange('');
      expect(component.filteredRecipes()).toEqual(mockRecipes);
    });

    it('should filter recipes by title', () => {
      component.onQueryChange('Chicken');
      const filtered = component.filteredRecipes();
      expect(filtered.length).toBe(1);
      expect(filtered[0].title).toBe('Chicken Handi');
    });

    it('should filter recipes by instructions', () => {
      component.onQueryChange('pot');
      const filtered = component.filteredRecipes();
      expect(filtered.length).toBe(1);
      expect(filtered[0].title).toBe('Chicken Handi');
    });
  });
});
