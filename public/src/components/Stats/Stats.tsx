import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Theme, withStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { observer } from "mobx-react";
import * as React from "react";
import { Loader, MatchItem } from "../";
import { IPaginator, IPredictionMatch } from "../../@types";
import { constants } from "../../constants";
import { LIMIT } from "../../stores/Paginator";
import { EmptyStats } from "./EmptyStats";
import { StatsInfo } from "./StatsInfo";

interface IStat {
  pending: number;
  rate: number;
  success: number;
  total: number;
}

interface IProps {
  classes: any;
  store: IPaginator<IPredictionMatch[]>;
}

const decorate = withStyles(({ spacing }: Theme) => ({
  ul: {
    justifyContent: "center",
    padding: spacing(2),
  },
}));

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

const calcStats = (store: IPaginator<IPredictionMatch[]>): IStat => {
  const total = store.initialData.length;
  let success = 0;
  let pending = 0;
  store.initialData.forEach((item: IPredictionMatch) => {
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
  return {
    pending,
    rate,
    success,
    total,
  };
};

const renderInfo = (store: IPaginator<IPredictionMatch[]>) => {
  const stat: IStat = calcStats(store);

  return (
    <React.Fragment>
      <Select value={store.season} onChange={store.handleSeasonChange}>
        {constants.seasons.map(s => (
          <MenuItem key={s.value} value={s.value}>
            {s.label}
          </MenuItem>
        ))}
      </Select>
      <StatsInfo
        total={stat.total}
        pending={stat.pending}
        success={stat.success}
        rate={stat.rate}
      />
      {store.data.map((item: IPredictionMatch) => (
        <MatchItem
          key={item.awayTeam + " " + item.homeTeam}
          awayTeam={item.awayTeam}
          homeTeam={item.homeTeam}
          homeScore={item.homeScore}
          awayScore={item.awayScore}
          status={item.status}
          id={item.id}
        />
      ))}
      {store.initialData.length > LIMIT ? (
        <DecoratedPagination store={store} />
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export const Stats = observer(
  class extends React.Component<
    {
      store: IPaginator<IPredictionMatch[]>;
    },
    {}
  > {
    public render() {
      return this.props.store.isLoaded ? (
        this.props.store.initialData.length < 1 ? (
          <EmptyStats />
        ) : (
          renderInfo(this.props.store)
        )
      ) : (
        <Loader />
      );
    }
  },
);
