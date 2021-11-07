import { observer } from "mobx-react";
import * as React from "react";
import { Loader, MatchItem } from "../";
import { IPredictionMatch, IStats } from "../../@types";
import { LIMIT } from "../../stores/StatsStore";
import { EmptyStats } from "./EmptyStats";
import { Filter } from "./Filter";
import { DecoratedPagination } from "./Pagination";
import { StatsInfo } from "./StatsInfo";

interface IStat {
  pending: number;
  rate: number;
  success: number;
  total: number;
}

/* istanbul ignore next */
const calcStats = (store: IStats): IStat => {
  const total = store.filteredData.length;
  let success = 0;
  let pending = 0;
  store.filteredData.forEach((item: IPredictionMatch) => {
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

const renderInfo = (store: IStats) => {
  const stat: IStat = calcStats(store);

  /* istanbul ignore next */
  return (
    <React.Fragment>
      <Filter store={store} />
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
      {store.filteredData.length > LIMIT ? (
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
      store: IStats;
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
