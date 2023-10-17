import { createSlice } from '@reduxjs/toolkit'
import { Ingredient } from '../utils/types';
import { PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
	bun: Ingredient | null;
	ingredients: Ingredient[];
}
const initialState: InitialState = {
	bun: null,
	ingredients: []
}

export const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		addIngredient(state, action: PayloadAction<Ingredient>) {
			if (action.payload.type !== 'bun') {
				state.ingredients.push(action.payload);
			}  else {
				state.bun = action.payload;
			}
		},
		deleteIngredient(state, action: PayloadAction<Ingredient>) {
			state.ingredients = state.ingredients.filter(ingredient => ingredient.uuid !== action.payload.uuid);
		},
		moveIngredient(state, action: PayloadAction<{fromIndex: number; toIndex: number}>) {
			state.ingredients.splice(action.payload.toIndex, 0, state.ingredients.splice(action.payload.fromIndex, 1)[0]);
		},
		clearConstructor(state) {
			state.bun = null;
			state.ingredients= [];
		},
	},
})

export const { addIngredient, deleteIngredient, moveIngredient, clearConstructor } = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer