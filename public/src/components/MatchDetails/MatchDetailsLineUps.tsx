import { List, ListItem, ListItemText, Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import * as React from "react";
import { IPlayer } from "../../@types/IMatchDetails";

interface IProps {
  homePlayers: IPlayer[];
  awayPlayers: IPlayer[];
}

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    lineups: {
      display: "flex",
      padding: spacing(0, 1),
    },
    list: {
      width: "50%",
    },
  }),
);

export const MatchDetailsLineUps = (props: IProps) => {
  const { homePlayers, awayPlayers } = props;
  // @ts-ignore
  const classes = useStyles();

  return (
    <div className={classes.lineups}>
      <List className={classes.list}>
        {homePlayers.map((player: IPlayer) => {
          return (
            <ListItem key={player.id} button={true}>
              <ListItemText>{player.name}</ListItemText>
            </ListItem>
          );
        })}
      </List>
      <List className={classes.list}>
        {awayPlayers.map((player: IPlayer) => {
          return (
            <ListItem key={player.id} button={true}>
              <ListItemText>{player.name}</ListItemText>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};
