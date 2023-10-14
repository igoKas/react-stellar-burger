import { createReducer } from '@reduxjs/toolkit';
import { WebsocketStatus } from '../../utils/live-orders';
import {
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage
} from './actions';
import { WsOrder } from '../../utils/types';

type InitialState = {
  status: string;
  orders: WsOrder[];
  connectingError: string;
}

const initialState: InitialState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  connectingError: ''
}

export const liveOrdersProfileReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, state => {
          state.status = WebsocketStatus.CONNECTING;
      })
    .addCase(wsOpen, state => {
        state.status = WebsocketStatus.ONLINE;
        state.connectingError = '';
    })
    .addCase(wsClose, state => {
        state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
        state.connectingError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.orders = action.payload.orders;
    })
})
