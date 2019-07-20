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
    groupName: {
      ...typography.h6,
      backgroundColor: palette.secondary.main,
      color: palette.common.white,
      fontSize: "1em",
      padding: spacing(2, 3),
    },
    header: {
      alignItems: "center",
      backgroundColor: palette.primary.main,
      color: palette.primary.contrastText,
      display: "flex",
      justifyContent: "space-between",
      padding: spacing(1, 2),
      [breakpoints.down("sm")]: {
        alignItems: "flex-start",
        flexFlow: "column",
        padding: spacing(2, 2, 1),
      },
    },
    paper: {
      margin: spacing(1),
      overflow: "hidden",
    },
    title: {
      fontWeight: "bold",
      margin: spacing(1.5, 0),
      [breakpoints.up("sm")]: {
        fontSize: "2.25rem",
        width: "50%",
      },
      [breakpoints.down("sm")]: {
        marginTop: 0,
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
          <Paper className={classes.paper}>
            <div className={classes.header}>
              <Typography
                variant="h4"
                className={classes.title}
                color="inherit"
              >
                {store.title}
              </Typography>
              <Nav />
            </div>
            {store.table.map((group: IGroup, key: number) => {
              return (
                <div key={key}>
                  {group.name && (
                    <div className={classes.groupName}>Group {group.name}</div>
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
                </div>
              );
            })}
          </Paper>
        ) : (
          <Loader />
        );
      }
    },
  ),
);
