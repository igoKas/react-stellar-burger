import { createAction } from '@reduxjs/toolkit';
import { WsOrders } from '../../utils/types';

export const connect = createAction<string>('LIVE_TABLE_CONNECT')
export const disconnect = createAction('LIVE_TABLE_DISCONNECT');
export const wsConnecting = createAction('LIVE_TABLE_WS_CONNECTING');
export const wsOpen = createAction('LIVE_TABLE_WS_OPEN');
export const wsClose = createAction('LIVE_TABLE_WS_CLOSE');
export const wsMessage = createAction<WsOrders>('LIVE_TABLE_WS_MESSAGE');
export const wsError = createAction<string>('LIVE_TABLE_WS_ERROR');
