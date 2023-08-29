import { configureStore } from '@reduxjs/toolkit';
import burgerConstructorReducer from './burger-constructor-slice';
import burgerIngredientsReducer from './burger-ingredients-slice';
import orderDetailsReducer from './order-details-slice';
import modalReducer from './modal-slice';

export const store = configureStore({
  reducer: {
		burgerConstructor: burgerConstructorReducer,
		burgerIngredients: burgerIngredientsReducer,
		orderDetails: orderDetailsReducer,
		modal: modalReducer
	},

})