import { List, ListItem, ListItemText, Theme } from "@material-ui/core";
import { red, yellow } from "@material-ui/core/colors";
import { createStyles, makeStyles } from "@material-ui/styles";
import * as React from "react";
import { IPlayer } from "../../@types";

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
    name: {
      alignItems: "center",
      display: "flex",
    },
    red: {
      backgroundColor: red[500],
      display: "inline-block",
      height: 15,
      margin: spacing(0.5),
      width: 9,
    },
    yellow: {
      backgroundColor: yellow[500],
      display: "inline-block",
      height: 15,
      margin: spacing(0.5),
      width: 9,
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
              <ListItemText>
                <div className={classes.name}>
                  <span>{player.name}</span>
                  {player.yellow_cards > 0 && (
                    <span className={classes.yellow} />
                  )}
                  {player.red_cards > 0 && <span className={classes.red} />}
                </div>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
      <List className={classes.list}>
        {awayPlayers.map((player: IPlayer) => {
          return (
            <ListItem key={player.id} button={true}>
              <ListItemText>
                <div className={classes.name}>
                  <span>{player.name}</span>
                  {player.yellow_cards > 0 && (
                    <span className={classes.yellow} />
                  )}
                  {player.red_cards > 0 && <span className={classes.red} />}
                </div>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};
