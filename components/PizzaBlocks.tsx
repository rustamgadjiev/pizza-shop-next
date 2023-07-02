"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategory,
  selectSearchValue,
  selectSort,
} from "../store/filter/filter";
import {
  getData,
  selectPizzaDataState
} from "../store/pizza-data/pizza-data";
import { PizzaBlock } from "./PizzaBlock";
import { Preloader } from "./Preloader";

type TPizzaItem = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

export const PizzaBlocks = () => {
  const { data, isLoading } = useSelector(selectPizzaDataState);
  const selectedCategoryId = useSelector(selectCategory);
  const selectedSortId = useSelector(selectSort);
  const searchValue = useSelector(selectSearchValue);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData({ selectedCategoryId, selectedSortId, searchValue }));
  }, [dispatch, selectedCategoryId, selectedSortId, searchValue]);

  return (
    <Preloader isLoading={isLoading}>
      {data.map((pizza: TPizzaItem) => (
        <PizzaBlock
          key={pizza.id}
          title={pizza.title}
          price={pizza.price}
          imageUrl={pizza.imageUrl}
          sizes={pizza.sizes}
          types={pizza.types}
        />
      ))}
    </Preloader>
  );
};
