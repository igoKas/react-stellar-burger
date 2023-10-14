import { createAction } from '@reduxjs/toolkit';
import { WsOrders } from '../../utils/types';

export const connect = createAction<string>('LIVE_TABLE_CONNECT_PROFILE')
export const disconnect = createAction('LIVE_TABLE_DISCONNECT_PROFILE');
export const wsConnecting = createAction('LIVE_TABLE_WS_CONNECTING_PROFILE');
export const wsOpen = createAction('LIVE_TABLE_WS_OPEN_PROFILE');
export const wsClose = createAction('LIVE_TABLE_WS_CLOSE_PROFILE');
export const wsMessage = createAction<WsOrders>('LIVE_TABLE_WS_MESSAGE_PROFILE');
export const wsError = createAction<string>('LIVE_TABLE_WS_ERROR_PROFILE');
