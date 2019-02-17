import {
  Button,
  createStyles,
  Paper,
  TextField,
  Theme,
  withStyles,
} from "@material-ui/core";
import { observer } from "mobx-react";
import * as React from "react";
import { Redirect } from "react-router-dom";
import { Message } from "../";
import { IRegistrationProps } from "../../@types";
import { dict } from "../../dict";
import { registrationStore, userStore } from "../../stores";

const styles = ({ spacing }: Theme) =>
  createStyles({
    paper: {
      margin: spacing.unit,
      padding: spacing.unit * 3,
    },
  });

export const Registration = withStyles(styles)(
  observer(
    class extends React.Component<IRegistrationProps, {}> {
      public render() {
        const { classes, store } = this.props;
        const { email, name, password } = store.user;
        return !userStore.isLoggedIn ? (
          <Paper classes={{ root: classes.paper }}>
            <form onSubmit={store.handleSubmit} autoComplete="off">
              <TextField
                id="name"
                required={true}
                fullWidth={true}
                label={dict.name}
                value={name}
                onChange={store.handleChange.bind(this, "name")}
                margin="normal"
                autoFocus={true}
              />
              <TextField
                id="email"
                required={true}
                fullWidth={true}
                label={dict.email}
                value={email}
                onChange={store.handleChange.bind(this, "email")}
                margin="normal"
                type="email"
              />
              <TextField
                id="password"
                required={true}
                fullWidth={true}
                label={dict.password}
                value={password}
                onChange={store.handleChange.bind(this, "password")}
                margin="normal"
                type="password"
              />
              <Button
                disabled={
                  email.length < 1 || name.length < 1 || password.length < 1
                }
                type="submit"
                variant="contained"
                color="secondary"
              >
                {dict.register}
              </Button>
            </form>
            <Message
              onClose={registrationStore.closeSnackbar}
              open={registrationStore.hasError}
              text={dict.registrationError}
            />
          </Paper>
        ) : (
          <Redirect to="/" />
        );
      }
    },
  ),
);
