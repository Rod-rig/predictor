import axios, { AxiosResponse } from "axios";
import * as React from "react";
import { Loader } from "../";
import { ASC, DESC, ORDER_BY } from "./constants";
import { IUser, RatingTable } from "./RatingTable";

type Order = "asc" | "desc";

export const Rating = () => {
  const [{ isLoaded, rating }, setData] = React.useState({
    isLoaded: false,
    rating: null,
  });
  const [order, setOrder] = React.useState<Order>(DESC);
  const [orderBy, setOrderBy] = React.useState(ORDER_BY);

  React.useEffect(() => {
    axios.get("/rating").then((response: AxiosResponse<IUser[]>) => {
      setData({
        isLoaded: true,
        rating: response.data
          .filter(user => user.hasEnoughPredictions)
          .sort(sort),
      });
    });
  }, []);

  const sort = (a: any, b: any) => {
    if (b.stats[orderBy] < a.stats[orderBy]) {
      return order === DESC ? -1 : 1;
    }
    if (b.stats[orderBy] > a.stats[orderBy]) {
      return order === DESC ? 1 : -1;
    }
    return 0;
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    const isDesc = orderBy === property && order === DESC;
    setOrder(isDesc ? ASC : DESC);
    setOrderBy(property);
  };

  return isLoaded ? (
    <RatingTable
      onRequestSort={handleRequestSort}
      order={order}
      orderBy={orderBy}
      rating={rating.sort(sort)}
    />
  ) : (
    <Loader />
  );
};
