import { Avatar } from "@material-ui/core";
import * as React from "react";
import { logos } from "../../content/logos";

interface IProps {
  teamName: string;
  modClass?: string;
}

export const TeamLogo = ({ teamName, modClass }: IProps) => {
  const src =
    teamName in logos
      ? logos[teamName]
      : "https://cdn2.iconfinder.com/data/icons/sport-items-2/512/football_soccer_badge_shield_ball_heraldic-128.png";
  return <Avatar src={src} className={modClass} />;
};
