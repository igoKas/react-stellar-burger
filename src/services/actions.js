import { api } from "../utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {setUser, setAuthChecked} from "./user-slice";

export const getUser = () => {
    return (dispatch) => {
        return api.getUser().then((res) => {
            dispatch(setUser(res.user));
        });
    };
};

export const checkUserAuth = () => {
    return (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUser())
                .catch(() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    dispatch(setUser(null));
                })
                .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    };
};

export const login = createAsyncThunk(
    "user/login",
    async (inputs, thunkAPI) => {
        try {
			const res = await api.login(inputs);
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);
            return res.user;
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось выполнить fetch')
		}
    }
);

export const logout = createAsyncThunk(
    "user/logout",
    async (_, thunkAPI) => {
        try {
			await api.logout();
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось выполнить fetch')
		}
    }
);

export const getIngredients = createAsyncThunk(
	'ingredient/fetchAll',
	async (_, thunkAPI) => {
		try {
			const res = await api.getIngredients();
			return res.data;
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось выполнить fetch')
		}
	}
)

export const postOrder = createAsyncThunk(
	'order/post',
	async (IDs, thunkAPI) => {
		try {
			return api.postOrder(IDs);
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось выполнить fetch')
		}
	}
)