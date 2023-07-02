import { Categories } from "../Categories";
import { PizzaBlocks } from "../PizzaBlocks";
import { Sort } from "../Sort";

export default function Home() {
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        <PizzaBlocks />
      </div>
    </>
  );
}
