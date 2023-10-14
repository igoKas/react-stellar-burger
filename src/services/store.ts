import { configureStore } from '@reduxjs/toolkit';
import burgerConstructorReducer from './burger-constructor-slice';
import burgerIngredientsReducer from './burger-ingredients-slice';
import orderDetailsReducer from './order-details-slice';
import userReducer from './user-slice';
import { liveOrdersReducer } from './live-orders/reducer';
import { liveOrdersProfileReducer } from './live-orders-profile/reducer';
import { socketMiddleware } from './middleware/socket-middleware';
import {
	connect as LiveOrdersWsConnect,
	disconnect as LiveOrdersWsDisconnect,
	wsOpen as LiveOrdersWsOpen,
	wsClose as LiveOrdersWsClose,
	wsMessage as LiveOrdersWsMessage,
	wsError as LiveOrdersWsError,
	wsConnecting as LiveOrdersWsConnecting
} from './live-orders/actions';

import {
	connect as LiveOrdersProfileWsConnect,
	disconnect as LiveOrdersProfileWsDisconnect,
	wsOpen as LiveOrdersProfileWsOpen,
	wsClose as LiveOrdersProfileWsClose,
	wsMessage as LiveOrdersProfileWsMessage,
	wsError as LiveOrdersProfileWsError,
	wsConnecting as LiveOrdersProfileWsConnecting
} from './live-orders-profile/actions';

const liveOrdersMiddleware = socketMiddleware({
	wsConnect: LiveOrdersWsConnect,
	wsDisconnect: LiveOrdersWsDisconnect,
	wsConnecting: LiveOrdersWsConnecting,
	onOpen: LiveOrdersWsOpen,
	onClose: LiveOrdersWsClose,
	onError: LiveOrdersWsError,
	onMessage: LiveOrdersWsMessage,
})

const liveOrdersProfileMiddleware = socketMiddleware({
	wsConnect: LiveOrdersProfileWsConnect,
	wsDisconnect: LiveOrdersProfileWsDisconnect,
	wsConnecting: LiveOrdersProfileWsConnecting,
	onOpen: LiveOrdersProfileWsOpen,
	onClose: LiveOrdersProfileWsClose,
	onError: LiveOrdersProfileWsError,
	onMessage: LiveOrdersProfileWsMessage,
})

export const store = configureStore({
	reducer: {
		burgerConstructor: burgerConstructorReducer,
		burgerIngredients: burgerIngredientsReducer,
		orderDetails: orderDetailsReducer,
		user: userReducer,
		liveOrders: liveOrdersReducer,
		liveOrdersProfile: liveOrdersProfileReducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(liveOrdersMiddleware, liveOrdersProfileMiddleware)
	}
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;