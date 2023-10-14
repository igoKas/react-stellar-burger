import { api } from "../utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUser, setAuthChecked } from "./user-slice";
import { FormFields, PostOrderApi } from "../utils/types";
import { AppDispatch } from "./store";

export const getUser = () => {
    return (dispatch: AppDispatch) => {
        return api.getUser().then((res) => {
            dispatch(setUser(res.user));
        });
    };
};

export const checkUserAuth = () => {
    return (dispatch: AppDispatch) => {
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

export const register = createAsyncThunk(
    "user/register",
    async (inputs: FormFields, thunkAPI) => {
        try {
            const res = await api.register(inputs);
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);
            return res.user;
        } catch (e) {
            return thunkAPI.rejectWithValue('Не удалось выполнить fetch')
        }
    }
);

export const login = createAsyncThunk(
    "user/login",
    async (inputs: FormFields, thunkAPI) => {
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
            await api.logout({"token": localStorage.getItem("refreshToken") || ''});
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
    async (IDs: PostOrderApi, thunkAPI) => {
        try {
            const res = await api.postOrder(IDs);
            return res.order.number;
        } catch (e) {
            return thunkAPI.rejectWithValue('Не удалось выполнить fetch')
        }
    }
)