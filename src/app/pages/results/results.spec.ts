import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Results } from './results';
import { mockRecipes } from '../../core/mocks/recipe.mock';
import { of } from 'rxjs';
import { RecipeService } from '../../core/services/recipe.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

fdescribe('Results', () => {
  let component: Results;
  let fixture: ComponentFixture<Results>;

  const mockService = {
    searchMeals: jasmine.createSpy('searchMeals').and.returnValue(of(mockRecipes)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Results],
      providers: [
        provideHttpClient(),
        { provide: RecipeService, useValue: mockService },
        {
          provide: ActivatedRoute,
          useValue: { queryParamMap: of(convertToParamMap({ q: 'chicken' })) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Results);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads mock recipes', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.recipes.length).toBe(1);
    expect(component.recipes[0].title).toBe('Chicken Handi');
  });
});
