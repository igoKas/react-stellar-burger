import { PATH } from "../utils/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getIngredients = createAsyncThunk(
	'ingredient/fetchAll',
	async () => {
		const response = await fetch(`${PATH}ingredients`);
		const data = await response.json();
		const ingredients = data.data.map(ingredient => ingredient = {...ingredient, amount: 0});
		return ingredients;
	}
)

export const postOrder = createAsyncThunk(
	'order/post',
	async (IDs) => {
		const response = await fetch(`${PATH}orders`, {
			method: 'POST',
			body: JSON.stringify(IDs),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		return data;
	}
)