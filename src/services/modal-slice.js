import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	modalVisibility: false,
	currentModal: null,
	data: null
}

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openIngredientModal(state, action) {
			state.modalVisibility = true;
			state.currentModal = 'ingredient';
			state.data = action.payload;
		},
		openOrderModal(state) {
			state.modalVisibility = true;
			state.currentModal = 'order';
		},
		closeModal() {
			return initialState
		}
	},
})

export const { openIngredientModal, openOrderModal, closeModal } = modalSlice.actions

export default modalSlice.reducer