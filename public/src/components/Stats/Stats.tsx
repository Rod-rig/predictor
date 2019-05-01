import { observer } from "mobx-react";
import * as React from "react";
import { Loader, MatchItem } from "../";
import { IPredictionMatch, IRetriever } from "../../@types";
import { EmptyStats } from "./EmptyStats";
import { StatsInfo } from "./StatsInfo";

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
          <React.Fragment>
            <StatsInfo />
            {store.data.map((item: IPredictionMatch) => {
              return (
                <MatchItem
                  key={item.awayTeam + " " + item.homeTeam}
                  awayTeam={item.awayTeam}
                  homeTeam={item.homeTeam}
                  homeScore={item.homeScore}
                  awayScore={item.awayScore}
                  status={item.status}
                />
              );
            })}
          </React.Fragment>
        )
      ) : (
        <Loader />
      );
    }
  },
);
