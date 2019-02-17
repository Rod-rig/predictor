import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import OpenWithIcon from "@material-ui/icons/OpenWith";
import * as React from "react";
import { Link } from "react-router-dom";
import { dict } from "../../dict";

const SidebarLink = (props: any) => <Link to="/predictions" {...props} />;

export const Sidebar = (props: { isOpen: boolean; toggleHandler(): void }) => (
  <Drawer open={props.isOpen} onClose={props.toggleHandler}>
    <div onClick={props.toggleHandler} onKeyDown={props.toggleHandler}>
      <List component="nav">
        <ListItem component={SidebarLink} button={true}>
          <ListItemIcon>
            <OpenWithIcon />
          </ListItemIcon>
          <ListItemText primary={dict.sidebar_menu_prediction} />
        </ListItem>
      </List>
    </div>
  </Drawer>
);
