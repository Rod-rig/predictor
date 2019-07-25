import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

export const MatchDetails = (props: RouteComponentProps<{ id: string }>) => {
  return <div>{props.match.params.id}</div>;
};
