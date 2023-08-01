import { PATH } from "./constants";

export const postOrderInfo = (setOrderInfo, bodyData) => {
	setOrderInfo(prevOrderInfo => ({ ...prevOrderInfo, isLoading: true }));
	fetch(`${PATH}/orders`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(bodyData)
		})
		.then(res => resOk(res))
		.then(data => setOrderInfo(prevOrderInfo => ({ ...prevOrderInfo, data: data.order.number.toString(), hasError: false, isLoading: false })))
		.catch(e => {
			console.log(e)
			setOrderInfo(prevOrderInfo => ({ ...prevOrderInfo, hasError: true, isLoading: false, error: e }))
		});
};

export const getIngredients = (setIngredients) => {
	setIngredients(prevIngredients => ({ ...prevIngredients, isLoading: true }));
	fetch(`${PATH}/ingredients`)
		.then(res => resOk(res))
		.then(data => setIngredients(prevIngredients => ({ ...prevIngredients, data: data.data, hasError: false, isLoading: false })))
		.catch(e => {
			console.log(e)
			setIngredients(prevIngredients => ({ ...prevIngredients, hasError: true, isLoading: false, error: e }));
		});
};

const resOk = res => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка ${res.status}`);
}