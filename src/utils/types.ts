export type Ingredient = {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
  count?: number;
  uuid?: string;
}

export type FormFields = {
  [key: string]: string;
}

export type PostOrderApi = {
  ingredients: string[];
}

export type WsOrders = {
  success: boolean;
  orders: WsOrder[];
  total: number;
  totalToday: number;
}

export type WsOrder = {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}
