import {
  Button,
  CircularProgress,
  createStyles,
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import { observer } from "mobx-react";
import * as React from "react";
import { Loader, PredictionFilter, TeamLogo } from "../";
import { IPredictionStore, ISportEvent } from "../../@types";
import { dict } from "../../dict";
import { userStore } from "../../stores";
import { PredictionMessage } from "./PredictionMessage";

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    away: {
      "& > span": {
        "align-items": "center",
        display: "flex",
        "justify-content": "flex-start",
      },
      width: "100%",
    },
    btnWrap: {
      marginBottom: spacing.unit,
      textAlign: "center",
    },
    circle: {
      marginRight: spacing.unit,
    },
    home: {
      "& > span": {
        "align-items": "center",
        display: "flex",
        "justify-content": "flex-end",
      },
      "&:first-child": {
        paddingLeft: spacing.unit * 2,
      },
      width: "100%",
    },
    input: {
      textAlign: "center",
      width: "3rem",
    },
    inputWrap: {
      fontSize: "1.25rem",
    },
    logo: {
      marginLeft: spacing.unit * 2,
      marginRight: 0,
    },
    noMatchesMsg: {
      margin: spacing.unit,
    },
    score: {
      alignItems: "center",
      display: "flex",
    },
    underline: {
      "&:after": {
        borderBottomColor: palette.secondary.main,
      },
    },
  });

interface IProps extends WithStyles<typeof styles> {
  store: IPredictionStore;
}

export const Prediction = withStyles(styles)(
  observer((props: IProps) => {
    const { classes, store } = props;
    const {
      buttonWasClicked,
      isFetched,
      isLoaded,
      matches,
      handleChange,
      handleSubmit,
      closeSuccessMsg,
      isSuccessSubmit,
    } = store;

    if (isLoaded && userStore.isLoggedIn !== undefined) {
      return (
        <React.Fragment>
          <PredictionFilter store={store} />
          {isFetched ? (
            <form autoComplete="off" onSubmit={handleSubmit.bind(store)}>
              {matches.length > 0 ? (
                <React.Fragment>
                  <List>
                    {matches.map((item: ISportEvent, index: number) => {
                      return (
                        <ListItem
                          disableGutters={true}
                          divider={true}
                          key={item.id}
                        >
                          <ListItemText classes={{ root: classes.home }}>
                            <InputLabel htmlFor={item.competitors[0].id}>
                              {item.competitors[0].name}
                            </InputLabel>
                            <TeamLogo
                              teamName={item.competitors[0].name}
                              modClass={classes.logo}
                            />
                          </ListItemText>
                          <div className={classes.score}>
                            <Input
                              classes={{
                                input: classes.input,
                                root: classes.inputWrap,
                                underline: classes.underline,
                              }}
                              id={item.competitors[0].id}
                              name={item.competitors[0].name}
                              onChange={handleChange.bind(store, index, 0)}
                              autoFocus={index === 0}
                            />
                            <div>:</div>
                            <Input
                              classes={{
                                input: classes.input,
                                root: classes.inputWrap,
                                underline: classes.underline,
                              }}
                              id={item.competitors[1].id}
                              name={item.competitors[1].name}
                              onChange={handleChange.bind(store, index, 1)}
                            />
                          </div>
                          <ListItemText classes={{ root: classes.away }}>
                            <TeamLogo teamName={item.competitors[1].name} />
                            <InputLabel htmlFor={item.competitors[1].id}>
                              {item.competitors[1].name}
                            </InputLabel>
                          </ListItemText>
                        </ListItem>
                      );
                    })}
                  </List>
                  <div className={classes.btnWrap}>
                    <Button
                      disabled={buttonWasClicked && !isSuccessSubmit}
                      type="submit"
                      variant="contained"
                      color="secondary"
                    >
                      {buttonWasClicked && !isSuccessSubmit ? (
                        <CircularProgress
                          className={classes.circle}
                          size={20}
                          color="inherit"
                        />
                      ) : (
                        ""
                      )}
                      {dict.submit_btn_text}
                    </Button>
                  </div>
                  <PredictionMessage
                    open={isSuccessSubmit}
                    handleClose={closeSuccessMsg}
                  />
                </React.Fragment>
              ) : (
                <Typography className={classes.noMatchesMsg} variant="body1">
                  {dict.no_available_prediction_matches}
                </Typography>
              )}
            </form>
          ) : (
            <Loader />
          )}
        </React.Fragment>
      );
    } else {
      return <Loader />;
    }
  }),
);
