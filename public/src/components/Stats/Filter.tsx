import { FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Theme, withStyles } from "@material-ui/core/styles";
import * as React from "react";
import { IStats } from "../../@types/IStats";
import { constants } from "../../constants";
import { dict } from "../../dict";

interface IProps {
  classes: any;
  store: IStats;
}

const ID = "stat-season";

const decorate = withStyles(({ breakpoints, spacing }: Theme) => ({
  root: {
    margin: spacing(1),
    width: 200,
    [breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}));

export const Filter = decorate((props: IProps) => (
  <FormControl
    classes={{
      root: props.classes.root,
    }}
  >
    <InputLabel shrink={true} id={ID}>
      {dict.season}
    </InputLabel>
    <Select
      id={ID}
      value={props.store.season}
      onChange={props.store.handleSeasonChange}
    >
      {constants.seasons.map(s => (
        <MenuItem key={s.value} value={s.value}>
          {s.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
));
