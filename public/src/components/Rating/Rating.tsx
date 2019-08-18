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

  React.useEffect(() => {
    axios.get("/rating").then((response: AxiosResponse<IUser[]>) => {
      setData({
        isLoaded: true,
        rating: response.data
          .filter(user => user.hasEnoughPredictions)
          .sort((a: any, b: any) => {
            if (b.stats[ORDER_BY] < a.stats[ORDER_BY]) {
              return -1;
            }
            if (b.stats[ORDER_BY] > a.stats[ORDER_BY]) {
              return 1;
            }
            return 0;
          }),
      });
    });
  }, []);
  return isLoaded ? <RatingTable rating={rating} /> : <Loader />;
};
