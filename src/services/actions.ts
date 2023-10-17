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
    async (inputs: FormFields) => {
        const res = await api.register(inputs);
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        return res.user;
    }
);

export const login = createAsyncThunk(
    "user/login",
    async (inputs: FormFields) => {
        const res = await api.login(inputs);
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        return res.user;
    }
);

export const logout = createAsyncThunk(
    "user/logout",
    async () => {
        await api.logout({ "token": localStorage.getItem("refreshToken") || '' });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }
);

export const getIngredients = createAsyncThunk(
    'ingredient/fetchAll',
    async () => {
        const res = await api.getIngredients();
        return res.data;
    }
)

export const postOrder = createAsyncThunk(
    'order/post',
    async (IDs: PostOrderApi) => {
        const res = await api.postOrder(IDs);
        return res.order.number;
    }
)