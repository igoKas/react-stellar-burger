import { PATH } from "./constants";
import { FormFields, PostOrderApi } from "./types";

type ApiData = FormFields | PostOrderApi;

function checkReponse(res: Response) {
	return res.ok ? res.json() : Promise.reject(res.status);
};

async function fetchApi(url: string, method: string, data?: ApiData, authorization?: string) {
	let options: RequestInit = {
		method,
		headers: {
			Authorization: authorization || ''
		},
	};
	if (data) {
		options = {
			method,
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				Authorization: authorization || ''
			},
			body: JSON.stringify(data)
		};
	};
	try {
		const response = await fetch(PATH + url, options);
		return checkReponse(response);
	} catch (error) {
		console.log('Возникла проблема с вашим fetch запросом: ', (error as Error).message);
	}
};
  
async function fetchApiWithRefresh(url: string, method: string, data?: ApiData, authorization?: string) {
	try {
		return fetchApi(url, method, data, authorization);
	} catch (err) {
		if ((err as Error).message === "jwt expired") {
		const refreshData = await refreshToken({token: localStorage.getItem("refreshToken") || ''});
		if (!refreshData.success) {
			return Promise.reject(refreshData);
		}
		localStorage.setItem("refreshToken", refreshData.refreshToken);
		localStorage.setItem("accessToken", refreshData.accessToken);
		return fetchApi(url, method, data, refreshData.accessToken);
		} else {
		return Promise.reject(err);
		}
	}
};

function refreshToken(data: FormFields) {
	return fetchApi(
		`/auth/token`,
		'POST',
		data,
	)
};

const getIngredients = () => {
	return fetchApi(
		'/ingredients',
		'GET',
	)
};

const forgotPassword = (data: FormFields) => {
	return fetchApi(
		`/password-reset`,
		'POST',
		data,
	)
};

const resetPassword = (data: FormFields) => {
	return fetchApi(
		`/password-reset/reset`,
		'POST',
		data,
	)
};

const postOrder = (data: PostOrderApi) => {
	return fetchApiWithRefresh(
		`/orders`,
		'POST',
		data,
		localStorage.getItem("accessToken") || ''
	)
};

const getOrder = (orderNumber: string) => {
	return fetchApiWithRefresh(
		`/orders/${orderNumber}`,
		'GET'
	)
};

const register = (data: FormFields) => {
	return fetchApi(
		`/auth/register`,
		'POST',
		data,
	)
};

const login = (data: FormFields) => {
	return fetchApi(
		`/auth/login`,
		'POST',
		data,
	)
};

const logout = (data: FormFields) => {
	return fetchApi(
		`/auth/logout`,
		'POST',
		data,
	)
};

const getUser = () => {
	return fetchApiWithRefresh(
		`/auth/user`,
		'GET',
		undefined,
		localStorage.getItem("accessToken") || '',
	)
};

const patchUser = (data: FormFields) => {
	return fetchApiWithRefresh(
		`/auth/user`,
		'PATCH',
		data,
		localStorage.getItem("accessToken") || '',
	)
};

export const api = {
	getIngredients,
	postOrder,
	getOrder,
	register,
	login,
	logout,
	getUser,
	patchUser,
	forgotPassword,
	resetPassword,
  };