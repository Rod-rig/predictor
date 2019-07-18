import {
  createStyles,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import OpenWithIcon from "@material-ui/icons/OpenWith";
import * as React from "react";
import { Link } from "react-router-dom";
import { dict } from "../../dict";

const SidebarLink = React.forwardRef((props: any, ref) => (
  <Link to="/predictions" {...props} ref={ref} />
));

const styles = ({ spacing }: Theme) =>
  createStyles({
    root: {
      marginRight: spacing(2),
    },
  });

interface IProps extends WithStyles<typeof styles> {
  isOpen: boolean;
  toggleHandler(): void;
}

export const Sidebar = withStyles(styles)((props: IProps) => {
  const { classes, isOpen, toggleHandler } = props;
  return (
    <Drawer open={isOpen} onClose={toggleHandler}>
      <div onClick={toggleHandler} onKeyDown={toggleHandler}>
        <List component="nav">
          <ListItem component={SidebarLink} button={true}>
            <ListItemIcon>
              <OpenWithIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.root}
              primary={dict.sidebar_menu_prediction}
            />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
});
