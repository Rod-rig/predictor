import { Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { observer } from "mobx-react";
import * as React from "react";
import { Loader, MatchItem } from "../";
import { IPaginator, IPredictionMatch } from "../../@types";
import { LIMIT } from "../../stores/Paginator";
import { EmptyStats } from "./EmptyStats";
import { StatsInfo } from "./StatsInfo";

const decorate = withStyles(({ spacing }: Theme) => ({
  ul: {
    justifyContent: "center",
    padding: spacing(2),
  },
}));

interface IProps {
  classes: any;
  store: IPaginator<IPredictionMatch[]>;
}

const DecoratedPagination = decorate((props: IProps) => (
  <Pagination
    classes={{
      ul: props.classes.ul,
    }}
    count={Math.ceil(props.store.initialData.length / LIMIT)}
    color="secondary"
    onChange={props.store.handlePageChange}
  />
));

const renderInfo = (store: IPaginator<IPredictionMatch[]>) => {
  const total = store.data.length;
  const list: JSX.Element[] = [];
  let success = 0;
  let pending = 0;
  store.data.forEach((item: IPredictionMatch) => {
    list.push(
      <MatchItem
        key={item.awayTeam + " " + item.homeTeam}
        awayTeam={item.awayTeam}
        homeTeam={item.homeTeam}
        homeScore={item.homeScore}
        awayScore={item.awayScore}
        status={item.status}
        id={item.id}
      />,
    );
    if (item.status > 0) {
      success += 1;
    }
    if (item.status < 0) {
      pending += 1;
    }
  });
  const rate =
    total === pending
      ? 0
      : Math.round((success / (total - pending)) * 100 * 100) / 100;
  return (
    <React.Fragment>
      <StatsInfo
        total={total}
        pending={pending}
        success={success}
        rate={rate}
      />
      {list}
      <DecoratedPagination store={store} />
    </React.Fragment>
  );
};

export const Stats = observer(
  class extends React.Component<
    {
      store: any;
    },
    {}
  > {
    public render() {
      const { store } = this.props;
      return store.isLoaded ? (
        store.data.length < 1 ? (
          <EmptyStats />
        ) : (
          renderInfo(store)
        )
      ) : (
        <Loader />
      );
    }
  },
);
