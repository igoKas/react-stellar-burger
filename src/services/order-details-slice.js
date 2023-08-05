import { createSlice } from '@reduxjs/toolkit';
import { postOrder } from '../utils/api';

const initialState = {
	isLoading: false,
	error: '',
	data: null,
}

export const orderDetailsSlice = createSlice({
	name: 'orderDetails',
	initialState,
	reducers: {
		
	},
	extraReducers: {
		[postOrder.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.error = '';
			state.data = action.payload;
		},
		[postOrder.pending]: (state) => {
			state.isLoading = true;
		},
		[postOrder.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		},
	}
})

export const {
	
} = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer