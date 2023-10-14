import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { postOrder } from './actions';

type InitialState = {
	isLoading: boolean;
	error: string | undefined;
	data: string;
}

const initialState: InitialState = {
	isLoading: false,
	error: '',
	data: '',
}

export const orderDetailsSlice = createSlice({
	name: 'orderDetails',
	initialState,
	reducers: {
		
	},
	extraReducers: (builder) => {
		builder
			.addCase(postOrder.fulfilled, (state, action: PayloadAction<string>) => {
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