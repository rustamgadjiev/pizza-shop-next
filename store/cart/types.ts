export type TCartList = {
  imageUrl: string;
  title: string;
  pizzaTypeId: number;
  size: number;
  price: number;
  count: number;
};

export type TState = {
  cartList: TCartList[];
  totalPrice: number;
};