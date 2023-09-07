import { PATH } from "../utils/constants";

function checkReponse(res) {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

async function fetchApi(url, data, method, authorization) {
	let options = {
		method,
		headers: {
			Authorization: authorization
		},
	};
	if (data) {
		options = {
			method,
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				Authorization: authorization
			},
			body: JSON.stringify(data)
		};
	};
	try {
		const response = await fetch(PATH + url, options);
		return checkReponse(response);
	} catch (error) {
		console.log('Возникла проблема с вашим fetch запросом: ', error.message);
	}
};
  
async function fetchApiWithRefresh(url, data, method, authorization) {
	try {
		return fetchApi(url, data, method, authorization);
	} catch (err) {
		if (err.message === "jwt expired") {
		const refreshData = await refreshToken();
		if (!refreshData.success) {
			return Promise.reject(refreshData);
		}
		localStorage.setItem("refreshToken", refreshData.refreshToken);
		localStorage.setItem("accessToken", refreshData.accessToken);
		return fetchApi(url, data, method, refreshData.accessToken);
		} else {
		return Promise.reject(err);
		}
	}
};

function refreshToken() {
	return fetchApi(
		`/auth/token`,
		{token: localStorage.getItem("refreshToken")},
		'POST'
	)
};

const getIngredients = () => {
	return fetchApi(
		'/ingredients',
	)
};

const forgotPassword = data => {
	return fetchApi(
		`/password-reset`,
		data,
		'POST'
	)
};

const resetPassword = data => {
	return fetchApi(
		`/password-reset/reset`,
		data,
		'POST'
	)
};

const postOrder = data => {
	return fetchApi(
		`/orders`,
		data,
		'POST'
	)
};

const register = data => {
	return fetchApi(
		`/auth/register`,
		data,
		'POST'
	)
};

const login = data => {
	return fetchApi(
		`/auth/login`,
		data,
		'POST'
	)
};

const logout = () => {
	return fetchApi(
		`/auth/logout`,
		{"token": localStorage.getItem("refreshToken")},
		'POST'
	)
};

const getUser = () => {
	return fetchApiWithRefresh(
		`/auth/user`,
		null,
		'GET',
		localStorage.getItem("accessToken")
	)
};

const patchUser = data => {
	return fetchApiWithRefresh(
		`/auth/user`,
		data,
		'PATCH',
		localStorage.getItem("accessToken")
	)
};

export const api = {
	getIngredients,
	postOrder,
	register,
	login,
	logout,
	getUser,
	patchUser,
	forgotPassword,
	resetPassword,
  };