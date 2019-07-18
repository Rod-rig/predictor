import { TableCell, TableRow, withStyles } from "@material-ui/core";
import classNames from "classnames";
import * as React from "react";
import { TeamLogo } from "../";

export interface IRow {
  [index: string]: any;
}

interface IProps {
  chars: string[];
  classes?: any;
  logo?: string;
  row: IRow;
}

const decorate = withStyles(({ breakpoints, palette, spacing }) => ({
  cell: {
    "&:last-child": {
      [breakpoints.down("sm")]: {
        paddingRight: spacing(0),
      },
    },
    "text-align": "center",
    width: "auto",
    [breakpoints.down("sm")]: {
      paddingLeft: spacing(0.75),
      paddingRight: spacing(0.75),
    },
  },
  draw: {
    [breakpoints.down("xs")]: {
      display: "none",
    },
  },
  edge: {
    "& td": {
      borderColor: palette.grey[50],
    },
    backgroundColor: palette.grey[300],
  },
  goals_against: {
    [breakpoints.down("sm")]: {
      display: "none",
    },
  },
  goals_for: {
    [breakpoints.down("sm")]: {
      display: "none",
    },
  },
  img: {
    "& img": {
      "object-fit": "contain",
    },
    "border-radius": 0,
    display: "inline-block",
    height: 25,
    marginRight: spacing(1),
    verticalAlign: "middle",
    width: 25,
  },
  info: {
    alignItems: "center",
    display: "flex",
    [breakpoints.down("xs")]: {
      wordBreak: "break-word",
    },
  },
  loss: {
    [breakpoints.down("xs")]: {
      display: "none",
    },
  },
  middle: {
    backgroundColor: palette.grey[200],
  },
  played: {
    [breakpoints.down("sm")]: {
      display: "none",
    },
  },
  row: {
    backgroundColor: palette.common.white,
  },
  // shortName: {
  //   display: 'inline',
  //   [breakpoints.up('sm')]: {
  //     display: 'none',
  //   },
  // },
  // team: {
  //   [breakpoints.down('xs')]: {
  //     display: 'none',
  //   },
  // },
  tableRow: {
    height: "48px",
  },
  teamName: {
    "text-align": "left",
    [breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  top: {
    backgroundColor: palette.grey[400],
  },
  win: {
    [breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

const highlightCell = (stage: string) => {
  if (
    stage === "Champions League" ||
    stage === "Champions League Qualification" ||
    stage === "Relegation"
  ) {
    return "edge";
  } else if (
    stage === "Europa League" ||
    stage === "Europa League Qualification" ||
    stage === "Playoffs"
  ) {
    return "middle";
  } else {
    return "row";
  }
};

export const Row = decorate((props: IProps) => {
  const { classes, row } = props;
  const rowClass = highlightCell(row.current_outcome);
  const topClass =
    row.rank === 1 && row.current_outcome !== "Playoffs" ? classes.top : "";
  const rowProps = {
    className: classNames(classes[rowClass], topClass, classes.tableRow),
    hover: !row.current_outcome,
  };
  return (
    <TableRow className={classes.tableRow} {...rowProps}>
      {props.chars.map(
        (val, i): JSX.Element => {
          if (val !== "team") {
            return (
              <TableCell
                key={i}
                padding="checkbox"
                className={`${classes.cell} ${
                  classes[val] ? classes[val] : ""
                }`}
              >
                {row[val]}
              </TableCell>
            );
          } else {
            return (
              <TableCell
                key={i}
                padding="checkbox"
                className={`${classes.cell} ${classes.teamName}`}
              >
                <div className={classes.info}>
                  <TeamLogo teamName={row.team.name} modClass={classes.img} />
                  <span className={classes.team}>{row.team.name}</span>
                  {/*<span className={classes.shortName}>{row.shortName}</span>*/}
                </div>
              </TableCell>
            );
          }
        },
      )}
    </TableRow>
  );
});
