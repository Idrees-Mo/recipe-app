import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCard } from './recipe-card';
import { provideHttpClient } from '@angular/common/http';

xdescribe('RecipeCard', () => {
  let component: RecipeCard;
  let fixture: ComponentFixture<RecipeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeCard],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
