import { ActionCreatorWithPayload, ActionCreatorWithoutPayload, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { WsOrders } from "../../utils/types";
import { AppDispatch, RootState } from "../store";
import { api } from "../../utils/api";



type WsActions = {
  wsConnect: ActionCreatorWithPayload<string>;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<WsOrders>;
  wsConnecting: ActionCreatorWithoutPayload;
  wsDisconnect: ActionCreatorWithoutPayload;
}

export const socketMiddleware = (wsActions: WsActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const {
        wsConnect,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
        wsDisconnect
      } = wsActions;
      if (wsConnect.match(action)) {
        socket = new WebSocket(action.payload);
        dispatch(wsConnecting());
      }
      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = () => {
          dispatch(onError('Error'));
        };

        socket.onmessage = async (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          if (parsedData.message === 'Invalid or missing token') {
            await api.refreshToken({token: localStorage.getItem("refreshToken") || ''});
            dispatch(wsConnect((event?.target as WebSocket).url));
          } else {
            const { success, ...restParsedData } = parsedData;
            dispatch(onMessage(restParsedData));
          }
        };

        socket.onclose = () => {
          dispatch(onClose());
        };

        if (wsDisconnect.match(action) && socket) {
          socket.close();
          socket = null;
        };
      }

      next(action);
    };
  };
};
