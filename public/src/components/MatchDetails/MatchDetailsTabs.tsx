import { Tab, Tabs, Theme, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import * as React from "react";
import { ITeamStat } from "../../@types";
import { dict } from "../../dict";
import { MatchDetailsLineUps } from "./MatchDetailsLineUps";
import { MatchDetailsStat } from "./MatchDetailsStat";
import { MatchDetailsTabPanel } from "./MatchDetailsTabPanel";

interface IProps {
  statistics: {
    teams: ITeamStat[];
  };
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
  const { statistics } = props;
  const teams = statistics.teams;
  const homePlayers = teams[0].players;
  const awayPlayers = teams[1].players;
  const homeTeamStats = teams[0].statistics;
  const awayTeamStats = teams[1].statistics;

  const [tab, setTab] = React.useState(0);
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
