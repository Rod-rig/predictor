import { Theme, withStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import * as React from "react";
import { IStats } from "../../@types/IStats";
import { LIMIT } from "../../stores/StatsStore";

interface IProps {
  classes: any;
  store: IStats;
}

/* istanbul ignore next */
const decorate = withStyles(({ spacing }: Theme) => ({
  ul: {
    justifyContent: "center",
    padding: spacing(2),
  },
}));

/* istanbul ignore next */
export const DecoratedPagination = decorate((props: IProps) => (
  <Pagination
    classes={{
      ul: props.classes.ul,
    }}
    color="secondary"
    count={Math.ceil(props.store.filteredData.length / LIMIT)}
    page={props.store.page}
    onChange={props.store.handlePageChange}
  />
));
