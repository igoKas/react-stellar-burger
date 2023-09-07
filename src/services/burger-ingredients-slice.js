import { createSlice } from '@reduxjs/toolkit';
import { getIngredients } from './actions';

const initialState = {
	isLoading: true,
	error: '',
	ingredients: [],
}

export const burgerIngredientsSlice = createSlice({
	name: 'burgerIngredients',
	initialState,
	reducers: {
		
	},
	extraReducers: (builder) => {
		builder
			.addCase(getIngredients.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = '';
				state.ingredients = action.payload;
			})
			.addCase(getIngredients.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getIngredients.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			})
	}
});

export const {
	
} = burgerIngredientsSlice.actions;

export default burgerIngredientsSlice.reducer