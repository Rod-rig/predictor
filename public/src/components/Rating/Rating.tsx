import axios, { AxiosResponse } from "axios";
import * as React from "react";
import { Loader } from "../";
import { IUser, RatingTable } from "./RatingTable";

const ORDER_BY = "oneXTwoSuccessRate";

export const Rating = () => {
  const [{ isLoaded, rating }, setData] = React.useState({
    isLoaded: false,
    rating: null,
  });
  const [order, setOrder] = React.useState<"asc" | "desc">("desc");
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
      return order === "desc" ? -1 : 1;
    }
    if (b.stats[orderBy] > a.stats[orderBy]) {
      return order === "desc" ? 1 : -1;
    }
    return 0;
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
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
