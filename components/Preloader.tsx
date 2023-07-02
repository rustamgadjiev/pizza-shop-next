import { Skeleton } from "./Skeleton";

type TProps = {
  isLoading: boolean,
  children: any,
}

export const Preloader = ({ isLoading, children }: TProps) => {
  return isLoading
    ? [...new Array(4)].map((_, pos) => <Skeleton key={pos} />)
    : children;
};