"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/cart/cart";
import { pizzaType } from "../utils/app-data";
// import PlusIcon from "../public/img/icon/plus.svg";

type TProps = {
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export const PizzaBlock = ({
  title,
  price,
  imageUrl,
  sizes,
  types,
}: TProps) => {
  const [pizzaCount, setPizzaCount] = useState<number>(0);
  const [pizzaTypeId, setPizzaTypeId] = useState<number>(0);
  const [pizzaSizeId, setPizzaSizeId] = useState<number>(0);

  const dispatch = useDispatch();

  const pizzaPrice =
    pizzaTypeId === 1
      ? pizzaSizeId === 1
        ? Math.floor(price * 1.3)
        : pizzaSizeId === 2
        ? Math.floor(price * 1.5)
        : Math.floor(price * 1.15)
      : pizzaSizeId === 1
      ? Math.floor(price * 1.15)
      : pizzaSizeId === 2
      ? Math.floor(price * 1.35)
      : price;

  const onClickAdd = () => {
    if (pizzaCount < 99) {
      setPizzaCount(pizzaCount + 1);
    }

    const newCartItem = {
      title,
      price: pizzaPrice,
      imageUrl,
      pizzaTypeId: types[pizzaTypeId],
      size: sizes[pizzaSizeId],
      count: pizzaCount + 1,
    };

    dispatch(addProduct({ newCartItem, initialPrice: pizzaPrice }));
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((typeId, i) => (
            <li
              key={typeId}
              className={pizzaTypeId === +i ? "active" : ""}
              onClick={() => setPizzaTypeId(+i)}
            >
              {pizzaType[typeId]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, i) => (
            <li
              key={size}
              className={pizzaSizeId === +i ? "active" : ""}
              onClick={() => setPizzaSizeId(+i)}
            >
              {size} см
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {pizzaPrice} ₽</div>
        <div
          className="button button--outline button--add"
          onClick={onClickAdd}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
              fill="#EB5A1E"
            />
            <path
              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              fill="#EB5A1E"
            />
          </svg>
          <span>Добавить</span>
          <i>{pizzaCount}</i>
        </div>
      </div>
    </div>
  );
};
