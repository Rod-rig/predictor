import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  withStyles,
} from "@material-ui/core";
import * as React from "react";
import { OrderType } from "../../@types";
import { dict, IDict } from "../../dict";

interface IHead {
  chars: string[];
  classes?: any;
  order?: OrderType;
  sortName?: string;
  sortHandle(name: string): any;
}

const decorate = withStyles(({ breakpoints, spacing }) => ({
  cell: {
    "& svg": {
      margin: spacing(-1, 0, 0),
      position: "absolute" as "absolute",
      right: spacing(-2),
      top: "50%",
    },
    "&:last-child": {
      [breakpoints.down("sm")]: {
        paddingRight: spacing(0.75),
      },
    },
    "min-width": 90,
    "text-align": "center",
    [breakpoints.down("sm")]: {
      minWidth: 80,
      paddingLeft: spacing(0.75),
      paddingRight: spacing(0.75),
    },
    [breakpoints.down("xs")]: {
      minWidth: 70,
      paddingRight: spacing(0.75),
    },
  },
  draw: {
    [breakpoints.down("xs")]: {
      display: "none",
    },
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
  loss: {
    [breakpoints.down("xs")]: {
      display: "none",
    },
  },
  played: {
    [breakpoints.down("sm")]: {
      display: "none",
    },
  },
  rank: {
    width: 80,
  },
  row: {
    height: 48,
  },
  team: {
    "min-width": 0,
    "text-align": "left",
    width: "100%",
    [breakpoints.down("xs")]: {
      width: 70,
    },
  },
  win: {
    [breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

export const TableHeadView = decorate((props: IHead) => {
  const { chars, classes, order, sortName, sortHandle } = props;
  return (
    <TableHead>
      <TableRow className={classes.row}>
        {chars.map((name: keyof IDict, index: number) => {
          return (
            <TableCell
              key={index}
              sortDirection={order === "asc" ? "desc" : "asc"}
              padding="checkbox"
              className={`${classes.cell} ${
                classes[name] ? classes[name] : ""
              }`}
              variant="head"
            >
              <Tooltip title="Sort" enterDelay={300}>
                <TableSortLabel
                  active={sortName === name}
                  direction={order}
                  onClick={sortHandle.bind(this, name)}
                >
                  {dict[name]}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
});
