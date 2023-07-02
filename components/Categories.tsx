import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory, setSelectedCategoryId } from "../store/filter/filter";
import { categoriesList } from "../utils/app-data";

export const Categories = () => {
  const selectedCategory = useSelector(selectCategory);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categoriesList.map((category, pos) => (
          <li
            key={category}
            className={selectedCategory === pos ? "active" : ""}
              onClick={() => dispatch(setSelectedCategoryId(pos))}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
