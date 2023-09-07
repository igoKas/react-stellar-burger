import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	bun: null,
	ingredients: []
}

export const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		addIngredient(state, action) {
			if (action.payload.type !== 'bun') {
				state.ingredients.push(action.payload);
			}  else {
				state.bun = action.payload;
			}
		},
		deleteIngredient(state, action) {
			state.ingredients = state.ingredients.filter(ingredient => ingredient.uuid !== action.payload.uuid);
		},
		moveIngredient(state, action) {
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