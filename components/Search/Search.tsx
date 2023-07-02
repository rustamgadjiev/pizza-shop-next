"use client";

import s from "./Search.module.scss";
import { ChangeEvent, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";
import {
  selectSearchValue,
  setSearchValue,
  setSelectedCategoryId,
} from "../../store/filter/filter";

export const Search = () => {
  const [value, setValue] = useState<string>("");
  const searchValue = useSelector(selectSearchValue);
  const dispatch = useDispatch();

  const updateSearchValue = useCallback(
    debounce((value: string) => {
      dispatch(setSelectedCategoryId(0));
      dispatch(setSearchValue(value));
    }, 500),
    []
  );

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <label className={s.wrapper}>
      <svg
        enableBackground="new 0 0 32 32"
        id="Glyph"
        version="1.1"
        viewBox="0 0 32 32"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <path
          d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
          id="XMLID_223_"
        />
      </svg>
      <input
        className={s.search}
        placeholder="Поиск пицц..."
        value={value}
        onChange={onChangeInput}
      />
      {searchValue && (
        <svg
          onClick={onClickClear}
          width="17px"
          height="17px"
          viewBox="0 0 17 17"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <title>ic_cancel</title>
          <desc>Created with Sketch.</desc>
          <defs></defs>
          <g
            id="Icons"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="round"
          >
            <g
              id="24-px-Icons"
              transform="translate(-364.000000, -124.000000)"
              stroke="#000000"
            >
              <g id="ic_cancel" transform="translate(360.000000, 120.000000)">
                <g id="cross">
                  <g transform="translate(5.000000, 5.000000)" strokeWidth="2">
                    <path d="M0,0 L14.1421356,14.1421356" id="Line"></path>
                    <path d="M14,0 L1.77635684e-15,14" id="Line"></path>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
      )}
    </label>
  );
};
