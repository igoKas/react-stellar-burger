import { createAction } from '@reduxjs/toolkit';

export const connect = createAction('LIVE_TABLE_CONNECT_PROFILE')
export const disconnect = createAction('LIVE_TABLE_DISCONNECT_PROFILE');
export const wsConnecting = createAction('LIVE_TABLE_WS_CONNECTING_PROFILE');
export const wsOpen = createAction('LIVE_TABLE_WS_OPEN_PROFILE');
export const wsClose = createAction('LIVE_TABLE_WS_CLOSE_PROFILE');
export const wsMessage = createAction('LIVE_TABLE_WS_MESSAGE_PROFILE');
export const wsError = createAction('LIVE_TABLE_WS_ERROR_PROFILE');
