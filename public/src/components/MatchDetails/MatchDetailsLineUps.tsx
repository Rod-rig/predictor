import { List, ListItem, ListItemText, Theme } from "@material-ui/core";
import { green, red, yellow } from "@material-ui/core/colors";
import SubdirectoryArrowLeft from "@material-ui/icons/SubdirectoryArrowLeft";
import SubdirectoryArrowRight from "@material-ui/icons/SubdirectoryArrowRight";
import { createStyles, makeStyles } from "@material-ui/styles";
import * as React from "react";
import { IPlayer } from "../../@types";

interface IProps {
  homePlayers: IPlayer[];
  awayPlayers: IPlayer[];
}

const useStyles = makeStyles(({ palette, spacing }: Theme) =>
  createStyles({
    assist: {
      border: `1px solid ${palette.common.black}`,
      display: "inline-block",
      fontSize: 10,
      height: 14,
      margin: spacing(0.5),
      padding: spacing(0, 0.5),
    },
    goal: {
      border: `1px solid ${palette.common.black}`,
      borderRadius: "50%",
      display: "inline-block",
      fontSize: 10,
      height: 16,
      lineHeight: "16px",
      margin: spacing(0.5),
      paddingRight: 1,
      textAlign: "center",
      width: 16,
    },
    in: {
      color: red[500],
      display: "inline-block",
      fontSize: 20,
      margin: spacing(0.25),
    },
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
      flexWrap: "wrap",
    },
    out: {
      color: green[500],
      display: "inline-block",
      fontSize: 20,
      margin: spacing(0.25),
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

const renderInLoop = (to: number, text: string, className: string) => {
  const collection: React.ReactNode[] = [];
  for (let i = 0; i < to; i++) {
    collection.push(
      <span key={i} className={className}>
        {text}
      </span>,
    );
  }
  return collection;
};

const renderList = (players: IPlayer[]) => {
  // @ts-ignore
  const classes = useStyles();
  return (
    <List className={classes.list}>
      {players.map((player: IPlayer) => {
        return (
          <ListItem key={player.id} button={true}>
            <ListItemText>
              <div className={classes.name}>
                <span>{player.name}</span>
                {player.goals_scored > 0 &&
                  renderInLoop(player.goals_scored, "G", classes.goal)}
                {player.assists > 0 &&
                  renderInLoop(player.assists, "AS", classes.assist)}
                {player.yellow_cards > 0 && <span className={classes.yellow} />}
                {player.red_cards > 0 && <span className={classes.red} />}
                {player.substituted_in > 0 && (
                  <SubdirectoryArrowLeft className={classes.in} />
                )}
                {player.substituted_out > 0 && (
                  <SubdirectoryArrowRight className={classes.out} />
                )}
              </div>
            </ListItemText>
          </ListItem>
        );
      })}
    </List>
  );
};

export const MatchDetailsLineUps = (props: IProps) => {
  const { homePlayers, awayPlayers } = props;
  // @ts-ignore
  const classes = useStyles();

  return (
    <div className={classes.lineups}>
      {renderList(homePlayers)}
      {renderList(awayPlayers)}
    </div>
  );
};
