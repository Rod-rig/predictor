import { Tab, Tabs, Theme, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import * as React from "react";
import { IPlayer } from "../../@types";
import { dict } from "../../dict";
import { MatchDetailsLineUps } from "./MatchDetailsLineUps";
import { MatchDetailsStat } from "./MatchDetailsStat";
import { MatchDetailsTabPanel } from "./MatchDetailsTabPanel";

interface IProps {
  homeTeamStats: {
    [key: string]: number;
  };
  awayTeamStats: {
    [key: string]: number;
  };
  homePlayers: IPlayer[];
  awayPlayers: IPlayer[];
}

const useStyles = makeStyles(({ palette, spacing }: Theme) =>
  createStyles({
    panel: {
      padding: spacing(1),
    },
    title: {
      margin: spacing(2),
    },
  }),
);

export const MatchDetailsTabs = (props: IProps) => {
  const { homeTeamStats, awayTeamStats, homePlayers, awayPlayers } = props;
  const [tab, setTab] = React.useState(1);
  // @ts-ignore
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  return (
    <React.Fragment>
      <Tabs
        value={tab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered={true}
      >
        <Tab value={0} label={dict.match_details_tab_stats} />
        <Tab value={1} label={dict.match_details_tab_lineups} />
      </Tabs>
      <MatchDetailsTabPanel tab={tab} index={0} className={classes.panel}>
        <Typography className={classes.title} variant="h4" align="center">
          {dict.match_details_tab_stats_title}
        </Typography>
        <MatchDetailsStat
          homeTeamStats={homeTeamStats}
          awayTeamStats={awayTeamStats}
        />
      </MatchDetailsTabPanel>
      <MatchDetailsTabPanel tab={tab} index={1}>
        <MatchDetailsLineUps
          homePlayers={homePlayers}
          awayPlayers={awayPlayers}
        />
      </MatchDetailsTabPanel>
    </React.Fragment>
  );
};
