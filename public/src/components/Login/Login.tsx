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
import { ILoginProps } from "../../@types";
import { dict } from "../../dict";
import { loginStore, userStore } from "../../stores";

const styles = ({ spacing }: Theme) =>
  createStyles({
    paper: {
      margin: spacing(1),
      padding: spacing(3),
    },
  });

export const Login = withStyles(styles)(
  observer(
    class extends React.Component<ILoginProps, {}> {
      public render() {
        const { classes, store } = this.props;
        return !userStore.isLoggedIn ? (
          <Paper classes={{ root: classes.paper }}>
            <form onSubmit={store.handleSubmit} autoComplete="off">
              <TextField
                id="name"
                required={true}
                fullWidth={true}
                label={dict.name}
                value={store.user.name}
                onChange={store.handleChange.bind(this, "name")}
                margin="normal"
                autoFocus={true}
              />
              <TextField
                id="password"
                required={true}
                fullWidth={true}
                label={dict.password}
                value={store.user.password}
                onChange={store.handleChange.bind(this, "password")}
                margin="normal"
                type="password"
              />
              <Button
                disabled={
                  store.user.name.length < 1 || store.user.password.length < 1
                }
                type="submit"
                variant="contained"
                color="secondary"
              >
                {dict.login}
              </Button>
            </form>
            <Message
              onClose={loginStore.closeSnackbar}
              open={loginStore.hasError}
              text={dict.login_error_msg}
            />
          </Paper>
        ) : (
          <Redirect to="/" />
        );
      }
    },
  ),
);
