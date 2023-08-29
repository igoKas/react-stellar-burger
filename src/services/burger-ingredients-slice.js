import { createSlice } from '@reduxjs/toolkit';
import { getIngredients } from '../utils/api';

const initialState = {
	isLoading: false,
	error: '',
	ingredients: [],
}

export const burgerIngredientsSlice = createSlice({
	name: 'burgerIngredients',
	initialState,
	reducers: {
		
	},
	extraReducers: {
		[getIngredients.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.error = '';
			state.ingredients = action.payload;
		},
		[getIngredients.pending]: (state) => {
			state.isLoading = true;
		},
		[getIngredients.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		},
	}
})

export const {
	
} = burgerIngredientsSlice.actions;

export default burgerIngredientsSlice.reducer