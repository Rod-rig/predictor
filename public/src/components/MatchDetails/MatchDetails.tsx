import axios, { AxiosResponse } from "axios";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Loader } from "../";

export const MatchDetails = (props: RouteComponentProps<{ id: string }>) => {
  const { id } = props.match.params;
  const [data, setData] = React.useState({
    isLoaded: false,
    matches: null,
  });

  React.useEffect(() => {
    axios.get(`/api/match/${id}`).then((response: AxiosResponse) => {
      setData({
        isLoaded: true,
        matches: response.data,
      });
    });
  }, []);

  return data.isLoaded ? (
    <div>{`${data.matches.statistics.teams[0].name} ${data.matches.sport_event_status.home_score}:${data.matches.sport_event_status.away_score} ${data.matches.statistics.teams[1].name}`}</div>
  ) : (
    <Loader />
  );
};
