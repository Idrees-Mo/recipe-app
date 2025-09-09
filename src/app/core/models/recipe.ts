export interface Ingredient {
  ingredient: string;
  measure: string;
}

export interface Recipe {
  id: string;
  title: string;
  category?: string;
  area?: string;
  instructions?: string;
  thumbnail?: string;
  youtube?: string;
  ingredients: Ingredient[];
}
