import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategoryId: 0,
  selectedSortId: 0,
  searchValue: "",
  currentPage: 1,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSelectedCategoryId(state, { payload: categoryId }) {
      state.selectedCategoryId = categoryId;
      sessionStorage.setItem("selectedCategoryId", categoryId);
    },
    setSelectedSortId(state, { payload: sortId }) {
      state.selectedSortId = sortId;
      sessionStorage.setItem("selectedSortId", sortId);
    },
    setSearchValue(state, { payload: value }) {
      state.searchValue = value;
    },
    setCurrentPage(state, { payload: pageId }) {
      state.currentPage = pageId;
    },
  },
});

export const filterReducer = filterSlice.reducer;
export const {
  setSelectedCategoryId,
  setSelectedSortId,
  setSearchValue,
  setCurrentPage,
} = filterSlice.actions;

export const selectCategory = (state: { filter: { selectedCategoryId: number; }; }) => state.filter.selectedCategoryId;
export const selectSort = (state: { filter: { selectedSortId: number; }; }) => state.filter.selectedSortId;
export const selectSearchValue = (state: { filter: { searchValue: string; }; }) => state.filter.searchValue;
export const selectCurrentPage = (state: { filter: { currentPage: number; }; }) => state.filter.currentPage;
