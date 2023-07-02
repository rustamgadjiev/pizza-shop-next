import { sortList } from "../../utils/app-data";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PIZZA_LIST_URL } from "../../utils/constants";

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

const initialState = {
  data: [],
  isLoading: false,
};

export const getData = createAsyncThunk(
  "pizza-data/getData",
  async ({
    selectedCategoryId,
    selectedSortId,
    searchValue,
  }: {
    selectedCategoryId: number;
    selectedSortId: number;
    searchValue: string;
  }) => {
    const category = selectedCategoryId ? `category=${selectedCategoryId}` : "";
    const sortBy = sortList[selectedSortId].sortProperty.replace("-", "");
    const order =
      sortList[selectedSortId].sortProperty[0] === "-" ? "asc" : "desc";
    const search = searchValue ? `search=${searchValue}` : "";

    const response = await fetch(
      PIZZA_LIST_URL + `?${category}&sortBy=${sortBy}&order=${order}&${search}`
    );

    if (response.ok) {
      return await response.json();
    }
  }
);

const pizzaDataSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getData.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export const pizzaDataReducer = pizzaDataSlice.reducer;
export const selectPizzaDataState = (state: { pizzaData: { data: TPizzaItem[], isLoading: boolean } }) =>
  state.pizzaData;
