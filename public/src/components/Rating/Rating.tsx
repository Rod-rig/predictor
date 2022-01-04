import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import axios, { AxiosResponse } from "axios";
import * as React from "react";
import { Loader } from "../";
import { dict } from "../../dict";
import { ASC, DESC, ORDER_BY } from "./constants";
import { IUser, RatingTable } from "./RatingTable";

type Order = "asc" | "desc";

export class Rating extends React.Component<
  {},
  {
    isLoaded: boolean;
    order: Order;
    orderBy: string;
    rating: IUser[];
  }
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isLoaded: false,
      order: DESC,
      orderBy: ORDER_BY,
      rating: [],
    };
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.sort = this.sort.bind(this);
  }

  public componentDidMount() {
    axios.get("/rating").then((response: AxiosResponse<IUser[]>) => {
      this.setState({
        isLoaded: true,
        rating: response.data
          .filter(user => user.hasEnoughPredictions)
          .sort(this.sort),
      });
    });
  }

  /* istanbul ignore next */
  public sort(a: any, b: any) {
    const { order, orderBy } = this.state;
    if (b.stats[orderBy] < a.stats[orderBy]) {
      return order === DESC ? -1 : 1;
    }
    if (b.stats[orderBy] > a.stats[orderBy]) {
      return order === DESC ? 1 : -1;
    }
    return 0;
  }

  /* istanbul ignore next */
  public handleRequestSort(event: React.MouseEvent<unknown>, property: string) {
    const { order, orderBy } = this.state;
    const isDesc = orderBy === property && order === DESC;
    this.setState({
      order: isDesc ? ASC : DESC,
      orderBy: property,
    });
  }

  public render() {
    return this.state.isLoaded ? (
      <>
        <Typography>
          <Box textAlign="center" m={1}>
            {dict.rating.note}
          </Box>
        </Typography>
        <RatingTable
          onRequestSort={this.handleRequestSort}
          order={this.state.order}
          orderBy={this.state.orderBy}
          rating={this.state.rating.sort(this.sort)}
        />
      </>
    ) : (
      <Loader />
    );
  }
}
