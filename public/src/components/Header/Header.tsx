import {
  AppBar,
  Button,
  createStyles,
  IconButton,
  Theme,
  Toolbar,
  withStyles,
} from "@material-ui/core";
import Menu from "@material-ui/icons/Menu";
import { observer } from "mobx-react";
import * as React from "react";
import { Link } from "react-router-dom";
import { Logo, Sidebar } from "../";
import { dict } from "../../dict";
import { userStore } from "../../stores";
import { AccountMenu } from "./AccountMenu";

const styles = ({ breakpoints, spacing }: Theme) =>
  createStyles({
    header: {
      marginBottom: spacing.unit,
      [breakpoints.up("lg")]: {
        marginBottom: spacing.unit * 3,
      },
    },
    headerBtn: {
      [breakpoints.down("xs")]: {
        paddingLeft: spacing.unit,
        paddingRight: spacing.unit,
      },
    },
    toolbar: {
      [breakpoints.down("xs")]: {
        paddingLeft: spacing.unit,
        paddingRight: spacing.unit,
      },
    },
    user: {
      marginLeft: "auto",
    },
  });

const LoginLink = (props: any) => <Link to="/login" {...props} />;
const RegLink = (props: any) => <Link to="/registration" {...props} />;

export const Header = withStyles(styles)(
  observer(
    class extends React.Component<
      {
        classes: any;
      },
      {
        isSidebarOpen: boolean;
      }
    > {
      public state = {
        isSidebarOpen: false,
      };

      public toggleSidebar(isOpen: boolean): void {
        this.setState({
          isSidebarOpen: isOpen,
        });
      }

      public render() {
        const { classes } = this.props;
        return (
          <React.Fragment>
            <AppBar position="static" className={classes.header}>
              <Toolbar className={classes.toolbar}>
                <IconButton
                  onClick={this.toggleSidebar.bind(this, true)}
                  color="inherit"
                  aria-label="Menu"
                >
                  <Menu />
                </IconButton>
                <Logo />
                <div className={classes.user}>
                  {userStore.isLoggedIn ? (
                    <AccountMenu
                      userName={userStore.name}
                      logout={userStore.logout}
                    />
                  ) : (
                    <React.Fragment>
                      <Button
                        className={classes.headerBtn}
                        component={RegLink}
                        color="inherit"
                      >
                        {dict.register}
                      </Button>
                      <Button
                        className={classes.headerBtn}
                        component={LoginLink}
                        color="inherit"
                      >
                        {dict.login}
                      </Button>
                    </React.Fragment>
                  )}
                </div>
              </Toolbar>
            </AppBar>
            <Sidebar
              isOpen={this.state.isSidebarOpen}
              toggleHandler={this.toggleSidebar.bind(this, false)}
            />
          </React.Fragment>
        );
      }
    },
  ),
);
