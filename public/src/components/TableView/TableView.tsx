import {
  createStyles,
  Paper,
  Table,
  TableBody,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import { observer } from "mobx-react";
import * as React from "react";
import { Loader, Nav, Row, TableHeadView } from "../";
import { IGroup, ITable, ITeam } from "../../@types";

const styles = ({ breakpoints, palette, spacing, typography }: Theme) =>
  createStyles({
    group: {
      ...typography.h6,
      backgroundColor: palette.secondary.main,
      color: palette.common.white,
      fontSize: "",
      padding: spacing(2, 3),
    },
    header: {
      backgroundColor: palette.primary.main,
      color: palette.primary.contrastText,
      padding: spacing(1),
      [breakpoints.up("lg")]: {
        margin: spacing(0, 3),
        padding: spacing(1, 3, 3),
      },
    },
    paper: {
      marginBottom: spacing(1),
      [breakpoints.up("lg")]: {
        margin: spacing(0, 3, 3),
      },
    },
    title: {
      margin: "0.35em 0",
      [breakpoints.up("sm")]: {
        fontSize: "3.5em",
      },
    },
  });

interface IProps extends WithStyles<typeof styles> {
  store: ITable;
}

export const TableView = withStyles(styles)(
  observer(
    class extends React.Component<IProps, {}> {
      public render() {
        const { classes, store } = this.props;

        return store.isLoaded ? (
          <React.Fragment>
            <div className={classes.header}>
              {store.title && (
                <Typography
                  variant="h4"
                  className={classes.title}
                  color="inherit"
                >
                  {store.title}
                </Typography>
              )}
              <Nav />
            </div>
            {store.table.map((group: IGroup, key: number) => {
              return (
                <Paper key={key} className={classes.paper}>
                  {group.name && (
                    <div className={classes.group}>Group {group.name}</div>
                  )}
                  <Table>
                    <TableHeadView
                      order={store.table[key].order}
                      sortName={store.table[key].sortName}
                      sortHandle={store.sortHandler.bind(store, key)}
                      chars={store.chars}
                    />
                    <TableBody>
                      {group.team_standings.map(
                        (row: ITeam, index: number): JSX.Element => (
                          <Row key={index} row={row} chars={store.chars} />
                        ),
                      )}
                    </TableBody>
                  </Table>
                </Paper>
              );
            })}
          </React.Fragment>
        ) : (
          <Loader />
        );
      }
    },
  ),
);
