import { PATH } from "../utils/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
async function api(uri, data, method) {
	let options = {};
	if (data) {
		options = {
			method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		};
	}
	try {
		const response = await fetch(PATH + uri, options);
		if (!response.ok) {
			throw new Error('Ответ сети был не ok.');
		}
		const result = await response.json();
		return result
	} catch (error) {
		console.log('Возникла проблема с вашим fetch запросом: ', error.message);
	}
}

export const getIngredients = createAsyncThunk(
	'ingredient/fetchAll',
	async (_, thunkAPI) => {
		try {
			const data = await api('ingredients');
			return data.data;
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось выполнить fetch')
		}
	}
)

export const postOrder = createAsyncThunk(
	'order/post',
	async (IDs, thunkAPI) => {
		try {
			return api('orders', IDs, 'POST');
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось выполнить fetch')
		}
	}
)