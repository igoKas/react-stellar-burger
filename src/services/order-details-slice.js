import { createSlice } from '@reduxjs/toolkit';
import { postOrder } from './actions';

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
	extraReducers: (builder) => {
		builder
			.addCase(postOrder.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = '';
				state.data = action.payload;
			})
			.addCase(postOrder.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(postOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			})
		}
})

export const {
	
} = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer