import { ActionCreatorWithPayload, ActionCreatorWithoutPayload, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { WsOrders } from "../../utils/types";
import { AppDispatch, RootState } from "../store";



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

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch(onMessage(restParsedData));
        };

        socket.onclose = () => {
          dispatch(onClose());
        };

        if (wsDisconnect.match(action)) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};
