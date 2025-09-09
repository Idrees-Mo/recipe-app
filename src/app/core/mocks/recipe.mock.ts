import { Recipe } from '../models/recipe';

export const mockRecipe: Recipe = {
  id: '52795',
  title: 'Chicken Handi',
  category: 'Chicken',
  area: 'Indian',
  instructions: `Take a large pot or wok... (shorted for mock)`,
  thumbnail: 'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg',
  youtube: 'https://www.youtube.com/watch?v=IO0issT0Rmc',
  ingredients: [
    { ingredient: 'Chicken', measure: '1.2 kg' },
    { ingredient: 'Onion', measure: '5 thinly sliced' },
    { ingredient: 'Tomatoes', measure: '2 finely chopped' },
    { ingredient: 'Garlic', measure: '8 cloves chopped' },
    { ingredient: 'Ginger paste', measure: '1 tbsp' },
    { ingredient: 'Salt', measure: 'To taste' },
  ],
};

export const mockRecipes: Recipe[] = [mockRecipe];
