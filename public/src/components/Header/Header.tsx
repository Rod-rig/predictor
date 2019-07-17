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
      marginBottom: spacing(1),
      [breakpoints.up("lg")]: {
        marginBottom: spacing(3),
      },
    },
    headerBtn: {
      [breakpoints.down("xs")]: {
        paddingLeft: spacing(1),
        paddingRight: spacing(1),
      },
    },
    toolbar: {
      [breakpoints.down("xs")]: {
        paddingLeft: spacing(1),
        paddingRight: spacing(1),
      },
    },
    user: {
      marginLeft: "auto",
    },
  });

const LoginLink = React.forwardRef((props: any, ref) => (
  <Link to="/login" {...props} innerRef={ref} />
));
const RegLink = React.forwardRef((props: any, ref) => (
  <Link to="/registration" {...props} innerRef={ref} />
));

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
