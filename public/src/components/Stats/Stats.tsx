import { observer } from "mobx-react";
import * as React from "react";
import { Loader, MatchItem } from "../";
import { IPredictionMatch, IRetriever } from "../../@types";
import { EmptyStats } from "./EmptyStats";
import { StatsInfo } from "./StatsInfo";

const renderInfo = (store: IRetriever<IPredictionMatch[]>) => {
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
      />,
    );
    if (item.status > 0) {
      success += 1;
    }
    if (item.status < 0) {
      pending += 1;
    }
  });
  const rate = Math.round((success / (total - pending)) * 100);
  return (
    <React.Fragment>
      <StatsInfo
        total={total}
        pending={pending}
        success={success}
        rate={rate}
      />
      {list}
    </React.Fragment>
  );
};

export const Stats = observer(
  class extends React.Component<
    {
      store: IRetriever<IPredictionMatch[]>;
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
